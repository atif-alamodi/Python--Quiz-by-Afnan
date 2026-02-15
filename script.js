// =========================================
// Quiz (10 Questions) - MCQ & True/False only
// Instant correction + SCORE FIRST
// =========================================

const questions = [
  {
    question: "السؤال الأول:\nما المقصود بالخوارزمية؟",
    answers: [
      "لغة تتكون من 0 و1",
      "سلسلة من الخطوات المنظمة لحل مشكلة",
      "جهاز يقوم بالمعالجة",
      "برنامج مكتوب بلغة الآلة"
    ],
    correct: 1,
    explanation: "الخوارزمية هي خطوات مرتبة ومنظمة لحل مشكلة."
  },
  {
    question: "السؤال الثاني:\nأي من التالي يُعد من مكونات الحاسب الرئيسية كما وردت في المقرر؟",
    answers: [
      "برنامج Word",
      "التخزين والاسترجاع (Memory & Storage)",
      "متصفح الإنترنت",
      "ملف نصي محفوظ"
    ],
    correct: 1,
    explanation: "من المكونات الأساسية للحاسب: التخزين والاسترجاع."
  },
  {
    question: "السؤال الثالث (صح أو خطأ):\nلغة الآلة تتكون من الرمزين 0 و1 فقط.",
    answers: ["صح", "خطأ"],
    correct: 0,
    explanation: "لغة الآلة ثنائية (0 و1)."
  },
  {
    question: "السؤال الرابع:\nأي من التالي يُمثل الفرق الصحيح بين المفسّر والمترجم؟",
    answers: [
      "المترجم يترجم البرنامج كاملاً ثم ينفذه",
      "المفسّر يترجم البرنامج كاملاً دفعة واحدة",
      "لا يوجد فرق بينهما",
      "المفسّر لا يحول إلى لغة الآلة"
    ],
    correct: 0,
    explanation: "Compiler يترجم البرنامج كاملاً، Interpreter ينفذ سطرًا سطرًا."
  },
  {
    question: "السؤال الخامس:\nأي من التالي يُعد من أنماط بناء البرامج الأساسية؟",
    answers: [
      "التسلسل",
      "الشرط",
      "التكرار",
      "جميع ما سبق"
    ],
    correct: 3,
    explanation: "أنماط بناء البرامج: التسلسل والشرط والتكرار."
  },
  {
    question: "السؤال السادس:\nأي من الأخطاء التالية يحدث عند كتابة print بهذه الطريقة: primt ؟",
    answers: [
      "NameError",
      "SyntaxError",
      "Logical Error",
      "TypeError"
    ],
    correct: 1,
    explanation: "كتابة primt بدل print يُعد خطأ نحوي SyntaxError."
  },
  {
    question: "السؤال السابع (صح أو خطأ):\nبايثون تميز بين الأحرف الكبيرة والصغيرة في أسماء المتغيرات.",
    answers: ["صح", "خطأ"],
    correct: 0,
    explanation: "Python حساسة لحالة الأحرف (Case-sensitive)."
  },
  {
    question: "السؤال الثامن:\nأي سطر صحيح لطباعة عبارة في بايثون؟",
    answers: [
      "echo(\"مرحبا\")",
      "print(\"مرحبا\")",
      "write(\"مرحبا\")",
      "output(\"مرحبا\")"
    ],
    correct: 1,
    explanation: "الدالة الصحيحة للطباعة في بايثون هي print()."
  },
  {
    question: "السؤال التاسع:\nأي سطر يُستخدم لقراءة إدخال المستخدم في بايثون؟",
    answers: [
      "read()",
      "input()",
      "scan()",
      "get()"
    ],
    correct: 1,
    explanation: "input() تُستخدم لقراءة إدخال المستخدم."
  },
  {
    question: "السؤال العاشر:\nمن أسباب انتشار لغة بايثون:",
    answers: [
      "صعوبة تعلمها",
      "قلة استخدامها",
      "بساطة قواعدها",
      "تعمل على نظام واحد فقط"
    ],
    correct: 2,
    explanation: "من أسباب انتشارها بساطة قواعدها وسهولة تعلمها."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  answersEl.innerHTML = "";

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;

  resultEl.innerHTML = `
    <div style="text-align:right;">
      <strong>الدرجة:</strong> ${score} / ${questions.length}
    </div>
    <div style="text-align:right; margin-top:6px;">
      اختر إجابة لعرض التصحيح.
    </div>
  `;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.classList.add("answer-btn");
    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const correctIndex = q.correct;

  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) btn.classList.add("correct");
    if (idx === selectedIndex && selectedIndex !== correctIndex) btn.classList.add("wrong");
  });

  const isCorrect = selectedIndex === correctIndex;
  if (isCorrect) score++;

  resultEl.innerHTML = `
    <div style="text-align:right; line-height:1.9;">
      <div style="font-size:18px; margin-bottom:8px;">
        <strong>الدرجة:</strong> ${score} / ${questions.length}
      </div>
      <div style="margin-bottom:6px;">
        ${isCorrect ? "إجابة صحيحة ✅" : "إجابة خاطئة ❌"}
      </div>
      <div><strong>الإجابة الصحيحة:</strong> ${q.answers[correctIndex]}</div>
      <div style="margin-top:6px;"><strong>الشرح:</strong> ${q.explanation}</div>
    </div>
  `;

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
};

function showFinalResult() {
  questionEl.innerText = "انتهى الاختبار 🎉";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";

  const percent = Math.round((score / questions.length) * 100);

  resultEl.innerHTML = `
    <div style="text-align:center; line-height:2;">
      <h2>الدرجة النهائية</h2>
      <h1>${score} / ${questions.length}</h1>
      <h3>${percent}%</h3>
      <button id="restartBtn"
        style="background:#16a34a; color:#fff; padding:10px 16px; border-radius:8px; border:none; cursor:pointer;">
        إعادة الاختبار
      </button>
    </div>
  `;

  document.getElementById("restartBtn").onclick = () => {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    loadQuestion();
  };
}

loadQuestion();
