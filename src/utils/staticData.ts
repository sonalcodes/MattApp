
export const DataList = [{id: 1, name: 'Daily mood & anxiety score'}];

export const dummyUserImage =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


export const AceForm1 = [
  {
    id:1,
    question:
      "1. Did you feel that you didn’t have enough to eat, had to wear dirty clothes, or had no one to protect or take care of you?",
    value: null,
  },
  {
    id:2,
    question:
      "2. Did you lose a parent through divorce, abandonment, death, or other reason?",
    value: null,
  },
  {
    id:3,
    question:
      "3. Did you live with anyone who was depressed, mentally ill, or attempted suicide?",
    value: null,
  },
  {
    id:4,
    question:
      "4. Did you live with anyone who had a problem with drinking or using drugs, including prescription drugs?",
    value: null,
  },
  {
    id:5,
    question:
      "5. Did your parents or adults in your home ever hit, punch, beat, or threaten to harm each other?",
    value: null,
  },
  {
    id:6,
    question:
      "6. Did you live with anyone who went to jail or prison?",
    value: null,
  },
  {
    id:7,
    question:
      "7. Did a parent or adult in your home ever swear at you, insult you, or put you down?",
    value: null,
  },
  {
    id:8,
    question:
      "8. Did a parent or adult in your home ever hit, beat, kick, or physically hurt you in any way?",
    value: null,
  },
  {
    id:9,
    question:
      "9. Did you feel that no one in your family loved you or thought you were special?",
    value: null,
  },
  {
    id:10,
    question:
      "10. Did you experience unwanted sexual contact (such as fondling or oral/anal/vaginal intercourse/penetration)?",
    value: null,
  },
];

export const AceForm2 = [
  {
    id:1,
    question: "Not much",
    value: null,
  },
  {
    id:2,
    question: "Some",
    value: null,
  },
  {
    id:3,
    question: "A lot",
    value: null,
  },
];

export const experienceArr = [
  {id:1,value:'Not much',selected:false},
  {id:2,value:'Some',selected:false},
  {id:3,value:'A lot',selected:false},


]

export const GADForm1 = [
  {
    id:1,
    question: "Feeling nervous, anxious or on edge?",
    value: null,
  },
  {
    id:2,
    question: "Not being able to stop or control worrying?",
    value: null,
  },
  {
    id:3,
    question: "Worrying too much about different things?",
    value: null,
  },
  { id:4,
    question: "Trouble relaxing?",
     value: null },
  {
    id:5,
    question: "Being so restless that it is hard to sit still?",
    value: null,
  },
  {
    id:6,
    question: "Becoming easily annoyed or irritable?",
    value: null,
  },
  {
    id:7,
    question: "Feeling afraid as if something awful might happen?",
    value: null,
  },
];

export const GADForm2 = [
  {
    id:1,
    question: "Not difficult at all",
    value: null,
  },
  {
    id:2,
    question: "Somewhat difficult",
    value: null,
  },
  {
    id:3,
    question: "Very difficult",
    value: null,
  },
  {
    id:4,
    question: "Extremely difficult",
    value: null,
  },
];
interface QIDSForm1dataProps {
  id: number;
  question: string;
  answers: string[];
  value: number|null;
  // value: null,
  selectedOptionIndex?: number;
}
export const QIDSForm1:QIDSForm1dataProps[] = [
  {
    id:1,
    question: "1. Falling Asleep:",
    answers: [
      "I never take longer than 30 minutes to fall asleep.",
      "I take at least 30 minutes to fall asleep, less than half the time.",
      "I take at least 30 minutes to fall asleep, more than half the time.",
      "I take more than 60 minutes to fall asleep, more than half the time.",
    ],
    value: null,
  },
  {
    id:2,
    question: "2. Sleep During the Night:",
    answers: [
      "I do not wake up at night.",
      "I have a restless, light sleep with a few brief awakenings each night.",
      "I wake up at least once a night, but I go back to sleep easily.",
      "I awaken more than once a night and stay awake for 20 minutes or more, more than half the time.",
    ],
    value: null,
  },
  {
    id:3,
    question: "3. Waking Up Too Early:",
    answers: [
      "Most of the time, I awaken no more than 30 minutes before I need to get up.",
      "More than half the time, I awaken more than 30 minutes before I need to get up.",
      " I almost always awaken at least one hour or so before I need to, but I go back to sleep eventually.",
      "I awaken at least one hour before I need to, and can't go back to sleep.",
    ],
    value: null,
  },
  {
    id:4,
    question: "4. Sleeping Too Much:",
    answers: [
      "I sleep no longer than 7-8 hours/night, without napping during the day.",
      "I sleep no longer than 10 hours in a 24-hour period including naps.",
      "I sleep no longer than 12 hours in a 24-hour period including naps.",
      "I sleep longer than 12 hours in a 24-hour period including naps.",
    ],
    value: null,
  },
  {
    id:5,
    question: "5. Feeling Sad:",
    answers: [
      "I do not feel sad",
      "I feel sad less than half the time.",
      "I feel sad more than half the time.",
      "I feel sad nearly all of the time.",
    ],
    value: null,
  },
  {
    id:6,
    question: "6. Decreased Appetite:",
    answers: [
      "There is no change in my usual appetite.",
      "I eat somewhat less often or lesser amounts of food than usual.",
      "I eat much less than usual and only with personal effort.",
      "I rarely eat within a 24-hour period, and only with extreme personal effort or when others persuade me to eat.",
    ],
    value: null,
  },
  {
    id:7,
    question: "7. Increased Appetite:",
    answers: [
      "There is no change from my usual appetite.",
      "I feel a need to eat more frequently than usual.",
      "I regularly eat more often and/or greater amounts of food than usual.",
      " I feel driven to overeat both at mealtime and between meals.",
    ],
    value: null,
  },
  {
    id:8,
    question: "8. Decreased Weight (Within the Last Two Weeks):",
    answers: [
      "I have not had a change in my weight.",
      "I feel as if I've had a slight weight loss.",
      "I have lost  pounds or more.",
      "I have lost 5 pounds or more.",
    ],
    value: null,
  },
  {
    id:9,
    question: "9. Increased Weight (Within the Last Two Weeks):",
    answers: [
      "I have not had a change in my weight.",
      "I feel as if I've had a slight weight gain.",
      "I have gained  pounds or more.",
      "I have gained 5 pounds or more.",
    ],
    value: null,
  },
  {
    id:10,
    question: "10. Concentration/Decision Making:",
    answers: [
      "There is no change in my usual capacity to concentrate or make decisions.",
      "I occasionally feel indecisive or find that my attention wanders.",
      "Most of the time, I struggle to focus my attention or to make decisions.",
      " I cannot concentrate well enough to read or cannot make even minor decisions.",
    ],
    value: null,
  },
  {
    id:11,
    question: "11. View of Myself:",
    answers: [
      " I see myself as equally worthwhile and deserving as other people.",
      "I am more self-blaming than usual.",
      "I largely believe that I cause problems for others.",
      "I think almost constantly about major and minor defects in myself.",
    ],
    value: null,
  },
  {
    id:12,
    question: "12. Thoughts of Death or Suicide:",
    answers: [
      "I do not think of suicide or death.",
      "I feel that life is empty or wonder if it's worth living.",
      "I think of suicide or death several times a week for several minutes.",
      "I think of suicide or death several times a day in some detail, or I have made specific plans for suicide or have actually tried to take my life.",
    ],
    value: null,
  },
  {
    id:13,
    question: "13. General Interest:",
    answers: [
      "There is no change from usual in how interested I am in other people or activities.",
      "I notice that I am less interested in people or activities.",
      "I find I have interest in only one or two of my formerly pursued activities.",
      "I have virtually no interest in formerly pursued activities.",
    ],
    value: null,
  },
  {
    id:14,
    question: "14. Energy Level:",
    answers: [
      "There is no change in my usual level of energy.",
      "I get tired more easily than usual.",
      "I have to make a big effort to start or finish my usual daily activities (for example, shopping, homework, cooking or going to work).",
      "I really cannot carry out most of my usual daily activities because I just don't have the energy.",
    ],
    value: null,
  },
  {
    id:15,
    question: "15. Feeling slowed down:",
    answers: [
      "I think, speak, and move at my usual rate of speed.",
      "I find that my thinking is slowed down or my voice sounds dull or flat.",
      "It takes me several seconds to respond to most questions and I'm sure my thinking is slowed.",
      "I am often unable to respond to questions without extreme effort.",
    ],
    value: null,
  },
  {
    id:16,
    question: "16. Feeling restless:",
    answers: [
      "I do not feel restless.",
      "I'm often fidgety, wringing my hands, or need to shift how I am sitting.",
      "I have impulses to move about and am quite restless.",
      "At times, I am unable to stay seated and need to pace around.",
    ],
    value: null,
  },
];

export const QIDSForm2 = [
'The highest score on any 1 of the 4 sleep items (1-4)',
'Item 5',
'The highest score on any 1 appetite/weight item (6-9)',
'Item 10',
'Item 11',
'Item 12',
'Item 13',
'Item 14',
'The highest score on either of the 2 psychomotor items (15 and 16)'
]
interface PHQForm1dataProps {
  id: number;
  question: string;
  value: number|null;
}
export const PHQForm1:PHQForm1dataProps[] = [
  {
    id:1,
    question: "Little interest or pleasure in doing things?",
    value: null,
  },
  {
    id:2,
    question: "Feeling down, depressed, or hopeless?",
    value: null,
  },
  {
    id:3,
    question: "Trouble falling or staying asleep, or sleeping too much?",
    value: null,
  },
  {
    id:4,
    question: "Feeling tired or having little energy?",
    value: null },
  {
    id:5,
    question: "Poor appetite or overeating?",
    value: null,
  },
  {
    id:6,
    question:
      "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    value: null,
  },
  {
    id:7,
    question:
      "Trouble concentrating on things, such as reading the newspaper or watching television?",
    value: null,
  },
  {
    id:8,
    question:
      "Moving or speaking so slowly that other people could have noticed?\n" +
      "Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    value: null,
  },
  {
    id:9,
    question:
      "Thoughts that you would be better off dead, or of hurting yourself in some way?",
    value: null,
  },
];


export const PHQForm2 = [
  {
    id:1,
    question: "Not difficult at all",
    value: null,
  },
  {
    id:2,
    question: "Somewhat difficult",
    value: null,
  },
  {
    id:3,
    question: "Very difficult",
    value: null,
  },
  {
    id:4,
    question: "Extremely difficult",
    value: null,
  },
];

interface RRSForm1dataProps {
  id: number,
  question: string,
  value: number|null,
  itemType: string,

}
export const RRSForm1:RRSForm1dataProps[] = [
  {
    id:1,
    question: "Think “What am I doing to deserve this?",
    value: null,
    itemType: "B",
  },
  {
    id:2,
    question:
      "Analyze recent events to try to understand why you are depressed",
    value: null,
    itemType: "R",
  },
  {
    id:3,
    question: "Think “Why do I always react this way?”",
    value: null,
    itemType: "B",
  },
  {
    id:4,
    question: "Go away by yourself and think about why you feel this way",
    value: null,
    itemType: "R",
  },
  {
    id:5,
    question: "Write down what you are thinking and analyze it",
    value: null,
    itemType: "R",
  },
  {
    id:6,
    question: "Think about a recent situation, wishing it had gone better",
    value: null,
    itemType: "B",
  },
  {
    id:7,
    question: "Think “Why do I have problems other people don’t have?”",
    value: null,
    itemType: "B",
  },
  {
    id:8,
    question: "Think “Why can’t I handle things better?”",
    value: null,
    itemType: "B",
  },
  {
    id:9,
    question:
      "Analyze your personality to try to understand why you are depressed",
    value: null,
    itemType: "R",
  },
  {
    id:10,
    question: "Go someplace alone to think about your feelings",
    value: null,
    itemType: "R",
  },
];
interface NSESSSForm1dataProps {
  id: number,
  question: string,
  value:number|null,
}

export const NSESSSForm1:NSESSSForm1dataProps[] = [
  {
    id:1,
    question:
      "Having “flashbacks,” that is, you suddenly acted or felt as if a stressful experience from the past was happening all over again (for example, you re-experienced parts of a stressful experience by seeing, hearing, smelling, or physically feeling parts of the experience)?",
    value: null,
  },
  {
    id:2,
    question:
      "Feeling very emotionally upset when something reminded you of a stressful experience?",
    value: null,
  },
  {
    id:3,
    question:
      "Trying to avoid thoughts, feelings, or physical sensations that reminded you of a stressful experience?",
    value: null,
  },
  {
    id:4,
    question:
      "Thinking that a stressful event happened because you or someone else (who didn’t directly harm you) did something wrong or didn’t do everything possible to prevent it, or because of something about you?",
    value: null,
  },
  {
    id:5,
    question:
      "Having a very negative emotional state (for example, you were experiencing lots of fear, anger, guilt, shame, or horror) after a stressful experience?",
    value: null,
  },
  {
    id:6,
    question:
      "Losing interest in activities you used to enjoy before having a stressful experience?",
    value: null,
  },
  {
    id:7,
    question:
      "Being “super alert,” on guard, or constantly on the lookout for danger?",
    value: null,
  },
  {
    id:8,
    question:
      "Feeling jumpy or easily startled when you hear an unexpected noise?",
    value: null,
  },
  {
    id:9,
    question:
      "Being extremely irritable or angry to the point where you yelled at other people, got into fights, or destroyed things?",
    value: null,
  },
];
interface dataProps {
  id: number;
  question: string;
  answers: string[];
  value: number|null;
}
export const YBOCSForm1:dataProps[] = [
  {
    id:1,
    question: "1. How much of your time is occupied by obsessive thoughts?",
    answers: [
      "None",
      "Less than 1 hr/day or occasional occurrence",
      "1 to 3 hrs/day or frequent",
      "Greater than 3 and up to 8 hrs/day or very frequent occurrence",
      "Greater than 8 hrs/day or nearly constant occurrence",
    ],
    value: null,
  },
  {
    id:2,
    question:
      "2. How much do your obsessive thoughts interfere with your work, school, social, or other important role functioning? Is there anything that you don’t do because of them?",
    answers: [
      "None",
      "Slight interference with social or other activities, but overall performance not impaired",
      "Definite interference with social or occupational performance, but still manageable",
      "Causes substantial impairment in social or occupational performance",
      "Incapacitating",
    ],
    value: null,
  },
  {
    id:3,
    question: "3. How much distress do your obsessive thoughts cause you?",
    answers: [
      "None",
      "Not too disturbing",
      "Disturbing, but still manageable",
      "Very disturbing",
      "Near constant and disabling distress",
    ],
    value: null,
  },
  {
    id:4,
    question:
      "4. How much of an effort do you make to resist the obsessive thoughts? How often do you try to disregard or turn your attention away from these thoughts as they enter your mind?",
    answers: [
      "Try to resist all the time",
      "Try to resist most of the time",
      "Make some effort to resist",
      "Yield to all obsessions without attempting to control them, but with some reluctance",
      "Completely and willingly yield to all obsessions",
    ],
    value: null,
  },
  {
    id:5,
    question:
      "5. How much control do you have over your obsessive thoughts? How successful are you in stopping or diverting your obsessive thinking? Can you dismiss them?",
    answers: [
      "Complete control",
      "Usually able to stop or divert obsessions with some effort and concentration",
      "Sometimes able to stop or divert obsessions",
      "Rarely successful in stopping or dismissing obsessions, can only divert attention with difficulty",
      "Obsessions are completely involuntary, rarely able to even momentarily alter obsessive thinking",
    ],
    value: null,
  },
  {
    id:6,
    question:
      "6. How much time do you spend performing compulsive behaviors? How much longer than most people does it take to complete routine activities because of your rituals? How frequently do you do rituals?",
    answers: [
      "None",
      "Less than 1 hr/day or occasional performance of compulsive behaviors",
      "From 1 to 3 hrs/day, or frequent performance of compulsive behaviors",
      "More than 3 and up to 8 hrs/day, or very frequent performance of compulsive behaviors",
      "More than 8 hrs/day, or near constant performance of compulsive behaviors (too numerous to count)",
    ],
    value: null,
  },
  {
    id:7,
    question:
      "7. How much do your compulsive behaviors interfere with your work, school, social, or other important role functioning? Is there anything that you don’t do because of the compulsions?",
    answers: [
      "None",
      "Slight interference with social or other activities, but overall performance not impaired",
      "Definite interference with social or occupational performance, but still manageable",
      "Causes substantial impairment in social or occupational performance",
      "Incapacitating",
    ],
    value: null,
  },
  {
    id:8,
    question:
      "8. How would you feel if prevented from performing your compulsion(s)? How anxious would you become?",
    answers: [
      "None",
      "Only slightly anxious if compulsions prevented",
      "Anxiety would mount but remain manageable if compulsions prevented",
      "Prominent and very disturbing increase in anxiety if compulsions interrupted",
      "Incapacitating anxiety from any intervention aimed at modifying activity",
    ],
    value: null,
  },
  {
    id:9,
    question: "9. How much of an effort do you make to resist the compulsions?",
    answers: [
      "Always try to resist",
      "Try to resist most of the time",
      "Make some effort to resist",
      "Yield to almost all compulsions without attempting to control them, but with some reluctance",
      "Completely and willingly yield to all compulsions",
    ],
    value: null,
  },
  {
    id:10,
    question:
      "10. How strong is the drive to perform the compulsive behavior? How much control do you have over the compulsions?",
    answers: [
      "Complete control",
      "Pressure to perform the behavior but usually able to exercise voluntary control over it",
      "Strong pressure to perform behavior, can control it only with difficulty",
      "Very strong drive to perform behavior, must be carried to completion, can only delay with difficulty",
      "Drive to perform behavior experienced as completely involuntary and over-powering, rarely able to even momentarily delay activity",
    ],
    value: null,
  },
];

export const YBOCSForm2 = [
  "8 - 15 = Mild OCD",
  "16 - 23 = Moderate OCD",
  "24 - 31= Severe OCD",
  "32 - 40 = Extreme OCD"
]
interface CSSRSForm1dataProps {
  id: number,
  question: string,
  example?: string,
  selected: string,
  disabled: boolean,
}
export const CSSRSForm1:CSSRSForm1dataProps[] = [
  {
    id:1,
    question:
      "1. Have you wished you were dead or wished you could go to sleep and not wake up?",
    selected: "",
    disabled: false,
  },
  {
    id:2,
    question: "2. Have you actually had any thoughts of killing yourself?",
    selected: "",
    disabled: true,
  },
  {
    id:3,
    question: "3. Have you been thinking about how you might do this?",
    example:
      "E.g. “I thought about taking an overdose but I never made a specific plan as to when where or how I would actually do it….and I would never go through with it.”",
    selected: "",
    disabled: true,
  },
  {
    id:4,
    question:
      "4. Have you had these thoughts and had some intention of acting on them?",
    example:
      "As opposed to “I have the thoughts but I definitely will not do anything about them.”",
    selected: "",
    disabled: true,
  },
  //  todo: this seems bizarre to me. There is two questions here.
  {
    id:5,
    question:
      "5. Have you started to work out or worked out the details of how to kill yourself and do you intend to carry out this plan?",
    selected: "",
    disabled: true,
  },
  {
    id:6,
    question:
      "6. Throughout your entire lifetime, have you ever done anything, started to do anything, or prepared to do anything to end your life?",
    example:
      "Examples: Collected pills, obtained a gun, gave away valuables, wrote a will or suicide note,took out pills but didn’t swallow any, held a gun but changed your mind or it was grabbed from your hand, went to the roof but didn’t jump; or actually took pills, tried to shoot yourself, cut yourself, tried to hang yourself, etc.",
    selected: "",
    disabled: true,
  },
  {
    id:7,
    question: "If yes, to question 6, was this within the past 3 months?",
    selected: "",
    disabled: true,
  },
];
