import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryZoomContainer,
  VictoryGroup,
  VictoryScatter,
  VictoryBar,
  VictoryClipContainer,
  VictoryLegend,
} from 'victory-native';
import {
  moodScores,
  mockTreatments,
} from '@components/MoodAndAnxietyGraph/mockMoodScores';
import React, {useState, useEffect} from 'react';
import SelectScaleBtns from '@components/MoodAndAnxietyGraph/SelectScaleBtns';
import {View, Text} from 'react-native';
import {
  calculateMoodData,
  calculateTreatmentData,
  getVeryFirstDataPoint,
  onScaleChange,
} from '@components/MoodAndAnxietyGraph/chartsHelpers';

const MoodAndAnxietyGraph = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  //
  const [zoomDomain, setZoomDomain] = useState();
  //
  const [selectedScale, setSelectedScale] = useState('2 Weeks');
  //
  const [trackerData, setTrackerData] = useState(moodScores);
  const [treatments, setTreatments] = useState(mockTreatments);
  //
  const [veryFirstDataPoint, setVeryFirstDataPoint] = useState(0);
  //
  const [scaledMoodData, setScaledMoodData] = useState();
  const [scaledAnxietyData, setScaledAnxietyData] = useState();
  const [scaledTreatmentData, setScaledTreatmentData] = useState();
  const [labels, setLabels] = useState();
  //
  const today = new Date();
  //
  useEffect(() => {
    if (trackerData && !trackerData.length) {
      setError(
        'You have not yet recorded any daily mood scores. If you are not receiving the daily text message at 6pm, please ask your clinician to switch on the daily text message feature.',
      );
    }
    if (trackerData.length && treatments && !veryFirstDataPoint) {
      // get the date of the very first treatment or score, whichever comes first
      let startDate = getVeryFirstDataPoint(today, treatments, trackerData);
      setVeryFirstDataPoint(startDate);
    }
  }, [trackerData, treatments]);

  useEffect(() => {
    if (veryFirstDataPoint && trackerData.length) {
      const filterData = onScaleChange(
        selectedScale,
        today,
        treatments,
        trackerData,
        veryFirstDataPoint,
      );
      //
      const {dates, labels} = filterData;
      //
      setLabels(labels);
      setScaledTreatmentData(
        calculateTreatmentData(10, treatments, dates, dates[0]),
      );
      //
      const moodData = calculateMoodData(trackerData, dates, dates[0]);
      setScaledMoodData(moodData[0]);
      setScaledAnxietyData(moodData[1]);
    }
  }, [trackerData, treatments, selectedScale]);

  const handleZoom = domain => {
    setZoomDomain(domain);
  };

  useEffect(() => {
    if (scaledTreatmentData && scaledMoodData && labels) {
      setLoading(false);
      setError();
    }
  }, [scaledTreatmentData, scaledMoodData, labels]);

  const display = () => {
    //need loading spinner
    if (loading) return <Text>Loading</Text>;
    //need error component
    if (error) return <Text>{error}</Text>;
  };

  return (
    <>
      <View style={{backgroundColor: '#2a3042'}}>
        {loading || error ? (
          display()
        ) : (
          <VictoryChart
            height={400}
            minDomain={{y: 0}}
            maxDomain={{y: 10}}
            padding={{top: 50, bottom: 85, right: 10, left: 10}}
            style={{
              background: {fill: '#2a3042'},
            }}
            domainPadding={{x: 2}}
            containerComponent={
              <VictoryZoomContainer
                responsive={true}
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
              />
            }>
            <VictoryAxis
              dependentAxis={true}
              tickLabelComponent={<VictoryLabel dx={30} />}
              standalone={true}
              style={{
                grid: {stroke: '#a6b0cf', strokeWidth: 0.25},
                tickLabels: {
                  fill: 'white',
                },
              }}
            />
            <VictoryAxis
              tickLabelComponent={<VictoryLabel dx={-27} dy={-6} />}
              tickValues={labels}
              fixLabelOverlap={true}
              style={{
                axis: {stroke: 'white'},
                ticks: {stroke: 'white', size: 5},
                tickLabels: {
                  fill: 'white',
                  angle: -90,
                  textAlign: 'right',
                },
              }}
            />
            <VictoryLegend
              x={15}
              y={10}
              orientation="horizontal"
              gutter={20}
              style={{}}
              data={[
                {
                  name: 'Mood',
                  symbol: {fill: '#ff6384', type: 'circle'},
                  labels: {fill: 'white'},
                },
                {
                  name: 'Anxiety',
                  symbol: {type: 'triangleUp', fill: '#8a2be2'},
                  labels: {fill: 'white'},
                },
                {
                  name: 'Day of Treatment',
                  symbol: {fill: '#4cc0c0', type: 'square'},
                  labels: {fill: 'white'},
                },
              ]}
            />
            {/*Treatments*/}
            <VictoryBar
              data={
                scaledTreatmentData &&
                scaledTreatmentData.map((treatment, index) => ({
                  x: labels[index],
                  y: treatment !== null ? 10 : 0,
                }))
              }
              barWidth={3}
              style={{data: {fill: '#4cc0c0'}}}
            />
            {/*Mood*/}
            <VictoryGroup
              color="#ff6384"
              data={scaledMoodData.map((score, index) => ({
                x: labels[index],
                y: score,
              }))}>
              <VictoryLine
                style={{
                  data: {stroke: '#ff6384'},
                  parent: {border: '1px solid '},
                }}
              />
              {labels.length <= 20 ? (
                <VictoryScatter
                  size={6}
                  symbol="circle"
                  groupComponent={<VictoryClipContainer />}
                />
              ) : null}
            </VictoryGroup>
            {/*Anxiety*/}
            <VictoryGroup
              data={scaledAnxietyData.map((score, index) => ({
                x: labels[index],
                y: score,
              }))}
              color="#8a2be2">
              <VictoryLine
                style={{
                  data: {stroke: '#8a2be2'},
                  parent: {border: '1px solid #ccc'},
                }}
              />
              {labels.length <= 20 ? (
                <VictoryScatter
                  size={6}
                  symbol="triangleUp"
                  style={{data: {stroke: '#8a2be2'}}}
                  groupComponent={<VictoryClipContainer />}
                />
              ) : null}
            </VictoryGroup>
          </VictoryChart>
        )}
      </View>
      <SelectScaleBtns
        selectedScale={selectedScale}
        setSelectedScale={setSelectedScale}
      />
    </>
  );
};
export default MoodAndAnxietyGraph;
