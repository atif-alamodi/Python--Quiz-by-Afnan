// =========================================
// Quiz (10 Questions) - MCQ/TF + Written (model answer)
// Instant correction + SCORE FIRST
// Auto-score for Q1-7 only
// =========================================

const questions = [
  {
    type: "mcq",
    question: "السؤال الأول (اختيار من متعدد)\nما المقصود بالخوارزمية؟",
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
    type: "mcq",
    question: "السؤال الثاني (اختيار من متعدد)\nأي من التالي يُعد من مكونات الحاسب الرئيسية كما وردت في المقرر؟",
    answers: [
      "برنامج Word",
      "التخزين والاسترجاع (Memory & Storage)",
      "متصفح الإنترنت",
      "ملف نصي محفوظ"
    ],
    correct: 1,
    explanation: "من المكونات/الوظائف الأساسية: التخزين والاسترجاع (Memory/Storage)."
  },
  {
    type: "tf",
    question: "السؤال الثالث (صح أو خطأ)\nلغة الآلة تتكون من الرمزين 0 و1 فقط.",
    answers: ["صح", "خطأ"],
    correct: 0,
    explanation: "لغة الآلة ثنائية (0/1)."
  },
  {
    type: "mcq",
    question: "السؤال الرابع (اختيار من متعدد)\nأي من التالي يُمثل الفرق الصحيح بين المفسّر والمترجم؟",
    answers: [
      "المترجم يترجم البرنامج كاملاً ثم ينفذه",
      "المفسّر يترجم البرنامج كاملاً دفعة واحدة",
      "لا يوجد فرق بينهما",
      "المفسّر لا يحول إلى لغة الآلة"
    ],
    correct: 0,
    explanation: "Compiler يترجم البرنامج بالكامل، بينما Interpreter ينفذ سطرًا بسطر."
  },
  {
    type: "mcq",
    question: "السؤال الخامس (اختيار من متعدد)\nأي من التالي يُعد من أنماط بناء البرامج الأساسية؟",
    answers: ["التسلسل", "الشرط", "التكرار", "جميع ما سبق"],
    correct: 3,
    explanation: "أنماط بناء البرامج الأساسية: التسلسل + الشرط + التكرار."
  },
  {
    type: "mcq",
    question: "السؤال السادس (اختيار من متعدد)\nأي من الأخطاء التالية يحدث عند كتابة كلمة print بهذه الطريقة: primt",
    answers: ["NameError", "SyntaxError", "Logical Error", "TypeError"],
    correct: 1,
    explanation: "في سياق المقرر، المثال primt بدل print يُعد خطأً نحويًا SyntaxError."
  },
  {
    type: "tf",
    question: "السؤال السابع (صح أو خطأ)\nبايثون تميز بين الأحرف الكبيرة والصغيرة في أسماء المتغيرات.",
    answers: ["صح", "خطأ"],
    correct: 0,
    explanation: "Python حساسة لحالة الأحرف (Case-sensitive)."
  },

  // Written questions (not auto-graded)
  {
    type: "written",
    question: "السؤال الثامن (سؤال تطبيقي)\nاكتب سطر برمجي بلغة بايثون يطبع العبارة التالية:\nمرحباً بك في عالم بايثون",
    modelAnswer: `print("مرحباً بك في عالم بايثون")`,
    tips: "استخدم الدالة print مع نص داخل علامات اقتباس."
  },
  {
    type: "written",
    question: "السؤال التاسع (سؤال تطبيقي)\nاكتب برنامجًا بسيطًا يطلب من المستخدم إدخال اسمه، ثم يطبع رسالة ترحيب به.",
    modelAnswer:
`name = input("أدخل اسمك: ")
print("مرحباً " + name)`,
    tips: "استخدم input لقراءة الاسم، ثم اطبع رسالة ترحيب."
  },
  {
    type: "written",
    question: "السؤال العاشر (سؤال مقالي قصير)\nاذكر سببين من أسباب انتشار لغة بايثون واستخدامها الواسع.",
    modelAnswer:
`- سهلة التعلم وبسيطة القواعد.
- تستخدم في مجالات كثيرة مثل: تحليل البيانات والذكاء الاصطناعي وتطوير الويب، وتعمل على عدة أنظمة تشغيل.`,
    tips: "اكتب سببين فقط بشكل واضح."
  }
];

// ---- State ----
let currentQuestion = 0;
let score = 0;            // auto-graded score (Q1-7)
let autoTotal = 0;        // number of auto-graded questions
let answered = false;

// Count auto-graded questions
autoTotal = questions.filter(q => q.type === "mcq" || q.type === "tf").length;

// ---- Elements ----
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

// ---- Helpers ----
function showScoreHeader(extra = "") {
  resultEl.innerHTML = `
    <div style="text-align:right;">
      <strong>الدرجة:</strong> ${score} / ${autoTotal}
      <div style="opacity:.8; margin-top:4px; font-size:14px;">
        (الدرجة تُحسب للأسئلة 1–7 فقط، والأسئلة 8–10 كتابية)
      </div>
    </div>
    ${extra ? `<div style="text-align:right; margin-top:8px;">${extra}</div>` : ""}
  `;
}

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  answersEl.innerHTML = "";

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;

  if (q.type === "mcq" || q.type === "tf") {
    showScoreHeader("اختر إجابة لعرض التصحيح.");

    q.answers.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.innerText = answer;
      btn.classList.add("answer-btn");
      btn.onclick = () => checkAutoAnswer(index);
      answersEl.appendChild(btn);
    });

  } else if (q.type === "written") {
    showScoreHeader("اكتب إجابتك ثم اضغط (عرض الإجابة النموذجية).");

    const textarea = document.createElement("textarea");
    textarea.id = "writtenAnswer";
    textarea.placeholder = "اكتب إجابتك هنا...";
    textarea.style.width = "100%";
    textarea.style.height = "110px";
    textarea.style.padding = "10px";
    textarea.style.borderRadius = "8px";
    textarea.style.border = "1px solid rgba(255,255,255,.2)";
    textarea.style.background = "#0f172a";
    textarea.style.color = "white";
    textarea.style.fontSize = "15px";
    textarea.style.resize = "vertical";
    answersEl.appendChild(textarea);

    const btnShow = document.createElement("button");
    btnShow.innerText = "عرض الإجابة النموذجية";
    btnShow.style.marginTop = "10px";
    btnShow.style.background = "#2563eb";
    btnShow.style.color = "white";
    btnShow.style.border = "none";
    btnShow.style.padding = "10px 14px";
    btnShow.style.borderRadius = "8px";
    btnShow.style.cursor = "pointer";
    btnShow.onclick = () => showModelAnswer();
    answersEl.appendChild(btnShow);

    nextBtn.disabled = false; // allow next even without grading
  }
}

function checkAutoAnswer(selectedIndex) {
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

  // ✅ SCORE FIRST
  resultEl.innerHTML = `
    <div style="text-align:right; line-height:1.9;">
      <div style="font-size:18px; margin-bottom:8px;">
        <strong>الدرجة:</strong> ${score} / ${autoTotal}
        <div style="opacity:.8; margin-top:4px; font-size:14px;">
          (الدرجة تُحسب للأسئلة 1–7 فقط، والأسئلة 8–10 كتابية)
        </div>
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

function showModelAnswer() {
  const q = questions[currentQuestion];
  resultEl.innerHTML = `
    <div style="text-align:right; line-height:1.9;">
      <div style="font-size:18px; margin-bottom:8px;">
        <strong>الدرجة:</strong> ${score} / ${autoTotal}
        <div style="opacity:.8; margin-top:4px; font-size:14px;">
          (الدرجة تُحسب للأسئلة 1–7 فقط، والأسئلة 8–10 كتابية)
        </div>
      </div>
      <div style="margin-bottom:6px;"><strong>ملاحظة:</strong> هذا سؤال كتابي (بدون تصحيح آلي).</div>
      <div><strong>نصيحة:</strong> ${q.tips}</div>
      <div style="margin-top:10px;"><strong>الإجابة النموذجية:</strong></div>
      <pre style="background:#0b1220; padding:10px; border-radius:8px; overflow:auto; border:1px solid rgba(255,255,255,.12);">${q.modelAnswer}</pre>
    </div>
  `;
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

  const percent = Math.round((score / autoTotal) * 100);

  resultEl.innerHTML = `
    <div style="text-align:center; line-height:2;">
      <h2>الدرجة النهائية (للأسئلة 1–7)</h2>
      <h1>${score} / ${autoTotal}</h1>
      <h3>${percent}%</h3>
      <div style="opacity:.85; font-size:14px; margin-top:6px;">
        الأسئلة 8–10 كتابية: راجع إجاباتك مع الإجابات النموذجية.
      </div>
      <button id="restartBtn"
        style="background:#16a34a; color:#fff; padding:10px 16px; border-radius:8px; border:none; cursor:pointer; margin-top:10px;">
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
