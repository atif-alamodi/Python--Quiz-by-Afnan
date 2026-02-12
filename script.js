// =========================================
// Python Quiz (Google Colab) - 9 MCQ
// Instant correction + SCORE FIRST
// =========================================

const questions = [
  {
    question: "1- ما هو Google Colab؟",
    answers: [
      "برنامج يتم تثبيته على الجهاز",
      "بيئة برمجة جاهزة تعمل عبر المتصفح",
      "لغة برمجة",
      "نظام تشغيل"
    ],
    correct: 1,
    explanation: "Google Colab بيئة برمجة تعمل عبر المتصفح وتوفر لك بايثون جاهزة دون تثبيت."
  },
  {
    question: "2- ما الرابط الصحيح للدخول إلى Google Colab؟",
    answers: [
      "google.com",
      "python.org",
      "colab.research.google.com",
      "github.com"
    ],
    correct: 2,
    explanation: "الرابط الرسمي هو: colab.research.google.com"
  },
  {
    question: "3- من مميزات Google Colab:",
    answers: [
      "يحتاج تحميل وتثبيت",
      "يعمل بدون إنترنت",
      "يوفر بيئة بايثون جاهزة بدون تثبيت",
      "لا يدعم بايثون"
    ],
    correct: 2,
    explanation: "Colab يوفّر بيئة بايثون جاهزة دون تثبيت على جهازك."
  },
  {
    question: "4- يدعم Google Colab استخدام:",
    answers: [
      "CPU فقط",
      "GPU فقط",
      "CPU و GPU و TPU",
      "RAM فقط"
    ],
    correct: 2,
    explanation: "Colab يمكنه تشغيل CPU وGPU وTPU حسب إعدادات التشغيل."
  },
  {
    question: "5- لتشغيل الكود في Google Colab نضغط:",
    answers: [
      "Ctrl + S",
      "Shift + Enter",
      "Alt + F4",
      "Enter فقط"
    ],
    correct: 1,
    explanation: "التشغيل السريع للخلية يكون غالبًا عبر Shift + Enter."
  },
  {
    question: "6- لإنشاء ملف جديد في Google Colab نختار:",
    answers: [
      "Edit → New",
      "File → New notebook",
      "View → New",
      "Insert → Code"
    ],
    correct: 1,
    explanation: "إنشاء دفتر جديد يكون من: File → New notebook."
  },
  {
    question: "7- يتم حفظ ملفات Google Colab في:",
    answers: [
      "سطح المكتب",
      "الهاردسك",
      "Google Drive",
      "USB"
    ],
    correct: 2,
    explanation: "يتم حفظ ملفات Colab في Google Drive افتراضيًا."
  },
  {
    question: "8- ما نوع الخلية التي يُكتب فيها كود بايثون؟",
    answers: [
      "Text",
      "Markdown",
      "Code",
      "Output"
    ],
    correct: 2,
    explanation: "الكود يُكتب داخل خلية Code."
  },
  {
    question: "9- لاستخدام Google Colab يجب تسجيل الدخول بواسطة:",
    answers: [
      "حساب فيسبوك",
      "حساب مايكروسوفت",
      "حساب Google",
      "أي بريد إلكتروني"
    ],
    correct: 2,
    explanation: "Colab يتطلب تسجيل الدخول بحساب Google."
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

  // قبل الإجابة: نعرض الدرجة الحالية (اختياري)
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

  // ✅ المطلوب: الدرجة تظهر أولًا عند التصحيح
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
