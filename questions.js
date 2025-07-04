// JLPT N5 Question Database (300 questions)
const questionBank = [
    // ========== Kanji Reading (80 questions) ==========
    {
        id: 1,
        type: "kanji",
        question: "What is the reading of this kanji: 人?",
        options: [
            { text: "ひと (hito)", isCorrect: true },
            { text: "いぬ (inu)", isCorrect: false },
            { text: "ねこ (neko)", isCorrect: false },
            { text: "みず (mizu)", isCorrect: false }
        ],
        explanation: "The kanji 人 means 'person' and is read as ひと (hito) in kun'yomi reading."
    },
    {
        id: 2,
        type: "kanji",
        question: "What is the reading of this kanji: 山?",
        options: [
            { text: "やま (yama)", isCorrect: true },
            { text: "かわ (kawa)", isCorrect: false },
            { text: "うみ (umi)", isCorrect: false },
            { text: "そら (sora)", isCorrect: false }
        ],
        explanation: "The kanji 山 means 'mountain' and is read as やま (yama) in kun'yomi reading."
    },
    {
        id: 3,
        type: "kanji",
        question: "What is the reading of this kanji: 川?",
        options: [
            { text: "かわ (kawa)", isCorrect: true },
            { text: "やま (yama)", isCorrect: false },
            { text: "みず (mizu)", isCorrect: false },
            { text: "うみ (umi)", isCorrect: false }
        ],
        explanation: "The kanji 川 means 'river' and is read as かわ (kawa)."
    },
    // Continue with 77 more kanji questions...

    // ========== Grammar (100 questions - including particles) ==========
    {
        id: 81,
        type: "grammar",
        question: "Which particle correctly completes this sentence: わたし___にほんごをべんきょうします。",
        options: [
            { text: "は", isCorrect: true },
            { text: "が", isCorrect: false },
            { text: "を", isCorrect: false },
            { text: "に", isCorrect: false }
        ],
        explanation: "The particle は marks the topic of the sentence. Here, 'I' am the topic who is studying Japanese."
    },
    {
        id: 82,
        type: "grammar",
        question: "Which particle indicates the direct object in: コーヒー___のみます。",
        options: [
            { text: "を", isCorrect: true },
            { text: "が", isCorrect: false },
            { text: "に", isCorrect: false },
            { text: "で", isCorrect: false }
        ],
        explanation: "The particle を marks the direct object of the verb. Here 'coffee' is what is being drunk."
    },
    {
        id: 83,
        type: "grammar",
        question: "Choose the correct particle: がっこう___いきます。",
        options: [
            { text: "に", isCorrect: true },
            { text: "を", isCorrect: false },
            { text: "が", isCorrect: false },
            { text: "で", isCorrect: false }
        ],
        explanation: "The particle に indicates the destination/direction of movement."
    },
    // Continue with 97 more grammar questions...

    // ========== Verbs (80 questions - including conjugations) ==========
    {
        id: 181,
        type: "verbs",
        question: "What is the te-form of いきます (to go)?",
        options: [
            { text: "いって", isCorrect: true },
            { text: "いきて", isCorrect: false },
            { text: "いかて", isCorrect: false },
            { text: "いけて", isCorrect: false }
        ],
        explanation: "The te-form of いきます is irregular. It changes to いって."
    },
    {
        id: 182,
        type: "verbs",
        question: "Convert to past tense: みます (to see)",
        options: [
            { text: "みました", isCorrect: true },
            { text: "みますた", isCorrect: false },
            { text: "みた", isCorrect: false },
            { text: "みでした", isCorrect: false }
        ],
        explanation: "The polite past tense of みます is みました."
    },
    {
        id: 183,
        type: "verbs",
        question: "What is the negative form of たべます (to eat)?",
        options: [
            { text: "たべません", isCorrect: true },
            { text: "たべないです", isCorrect: false },
            { text: "たべなくです", isCorrect: false },
            { text: "たべじゃない", isCorrect: false }
        ],
        explanation: "The polite negative form of たべます is たべません."
    },
    // Continue with 77 more verb questions...

    // ========== Adverbs (20 questions) ==========
    {
        id: 261,
        type: "adverbs",
        question: "Which adverb means 'often'?",
        options: [
            { text: "よく", isCorrect: true },
            { text: "すぐ", isCorrect: false },
            { text: "もう", isCorrect: false },
            { text: "あまり", isCorrect: false }
        ],
        explanation: "The adverb よく means 'often' or 'well'."
    },
    {
        id: 262,
        type: "adverbs",
        question: "Choose the correct adverb for this sentence: わたしは___べんきょうします。(I study a little)",
        options: [
            { text: "ちょっと", isCorrect: true },
            { text: "たくさん", isCorrect: false },
            { text: "ぜんぜん", isCorrect: false },
            { text: "いつも", isCorrect: false }
        ],
        explanation: "ちょっと means 'a little' and fits the context of the sentence."
    },
    // Continue with 18 more adverb questions...

    // ========== Reading Comprehension (20 questions) ==========
    {
        id: 281,
        type: "reading",
        question: "Read this and answer: たなかさんはまいあさ７じにあさごはんをたべます。８じにいえをでます。９じから５じまでかいしゃではたらきます。What time does Tanaka-san leave home?",
        options: [
            { text: "8じ", isCorrect: true },
            { text: "7じ", isCorrect: false },
            { text: "9じ", isCorrect: false },
            { text: "5じ", isCorrect: false }
        ],
        explanation: "The text states '８じにいえをでます' which means 'leaves home at 8 o'clock'."
    },
    {
        id: 282,
        type: "reading",
        question: "Read this and answer: きのうはあめでした。わたしはかさをもっていませんでした。だから、びょうきになりました。Why did the person get sick?",
        options: [
            { text: "They didn't have an umbrella", isCorrect: true },
            { text: "They didn't eat breakfast", isCorrect: false },
            { text: "They worked too much", isCorrect: false },
            { text: "They didn't sleep", isCorrect: false }
        ],
        explanation: "The text says 'かさをもっていませんでした' (didn't have an umbrella) and as a result 'びょうきになりました' (got sick)."
    }
    // Continue with 18 more reading questions...
];

// Function to get random questions from the bank
function getRandomQuestions() {
    // Filter questions by type to ensure proper distribution
    const kanjiQuestions = questionBank.filter(q => q.type === "kanji");
    const grammarQuestions = questionBank.filter(q => q.type === "grammar");
    const verbQuestions = questionBank.filter(q => q.type === "verbs");
    const adverbQuestions = questionBank.filter(q => q.type === "adverbs");
    const readingQuestions = questionBank.filter(q => q.type === "reading");
    
    // Select random questions from each category
    const selectedKanji = shuffleArray(kanjiQuestions).slice(0, 40);
    const selectedGrammar = shuffleArray(grammarQuestions).slice(0, 60);
    const selectedVerbs = shuffleArray(verbQuestions).slice(0, 40);
    const selectedAdverbs = shuffleArray(adverbQuestions).slice(0, 20);
    const selectedReading = shuffleArray(readingQuestions).slice(0, 40);
    
    // Combine all selected questions and shuffle them
    const allQuestions = [
        ...selectedKanji,
        ...selectedGrammar,
        ...selectedVerbs,
        ...selectedAdverbs,
        ...selectedReading
    ];
    
    return shuffleArray(allQuestions);
}

// Helper function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
