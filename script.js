/* =========================
   Quiz Engine (RTL / Arabic)
   - Instant correction + colors
   - Show score first
   - Explanation + page reference (from syllabus when available)
   - Final score at end
   - Anonymous test-taker: Session Code only
   ========================= */

"use strict";

// عناصر الصفحة (مطابقة لـ index.html عندك)
const elQuestion = document.getElementById("question");
const elAnswers = document.getElementById("answers");
const elResult = document.getElementById("result");
const btnNext = document.getElementById("nextBtn");

// حماية: لو العناصر غير موجودة، لا ينهار السكربت
if (!elQuestion || !elAnswers || !elResult || !btnNext) {
  console.error("Missing required HTML elements (question/answers/result/nextBtn).");
}

// ====== رمز جلسة (بدون اسم) ======
const sessionCode = "S-" + Math.random().toString(36).slice(2, 8).toUpperCase();

// ====== بنك الأسئلة ======
// ملاحظة مهمة:
// - أنا صحّحت (Networking) بناءً على المنهج: الشبكة مكوّن مستقل وليست ذاكرة.
// - بعض الأسئلة العامة قد تكون “معرفة بايثون” ولم أجد لها نصًا حرفيًا في صفحات الدرس الأول التي ظهرت لي أثناء البحث.
//   عندما لا يوجد نص مباشر: أضع page: null وnote توضيحية.
const questions = [
  // ========== من منهج “مكونات الحاسب” (تأكيد نصي في الدرس) ==========
  {
    q: "أي عبارة تصف (CPU) في مكونات الحاسب؟",
    choices: [
      "هي وحدة التخزين الدائم",
      "هي قلب تنفيذ أوامر البرامج وتقوم بالحسابات واتخاذ القرارات",
      "هي وسيلة عرض النتائج فقط",
      "هي شبكة لنقل البيانات"
    ],
    correct: 1,
    explain: "المنهج يذكر أن المعالجة (CPU) تنفذ أوامر البرامج وتقوم بالحسابات واتخاذ القرارات.",
    page: 6,
    cite: "2"
  },
  {
    q: "التخزين المؤقت (Memory) في المنهج يتميز بأنه:",
    choices: [
      "سريع وقريب من المعالج لكن محتواه يزول بانقطاع الطاقة",
      "أبطأ لكنه يحتفظ بالبيانات بعد إيقاف التشغيل",
      "هو شبكة لنقل البيانات",
      "هو وحدة إخراج"
    ],
    correct: 0,
    explain: "المنهج يذكر أن التخزين المؤقت سريع وقريب من المعالج لكنه يزول بانقطاع الطاقة.",
    page: 6,
    cite: "3"
  },
  {
    q: "التخزين (Storage) في المنهج يتميز بأنه:",
    choices: [
      "يزول محتواه بانقطاع الطاقة",
      "سريع جدًا وقريب من المعالج",
      "أبطأ لكنه يحتفظ بالبيانات والبرامج عند إيقاف التشغيل",
      "هو تنفيذ الأوامر داخل CPU"
    ],
    correct: 2,
    explain: "المنهج يذكر أن التخزين أبطأ لكنه يحتفظ بالبيانات والبرامج عند إيقاف التشغيل.",
    page: 6,
    cite: "4"
  },
  {
    q: "Networking في المنهج المقصود به:",
    choices: [
      "الذاكرة المؤقتة (Memory)",
      "التواصل/نقل البيانات عبر شبكات متصلة (وقد يُنظر له كامتداد للتخزين/النقل)",
      "وحدة إخراج",
      "لغة برمجة"
    ],
    correct: 1,
    explain: "المنهج يذكر Networking كاتصال/نقل بيانات عبر شبكات متصلة، وليس ذاكرة.",
    page: 6,
    cite: "5"
  },

  // ========== خوارزميات / لغة الآلة / أنماط البرامج (موجودة بالمنهج) ==========
  {
    q: "ما المقصود بالخوارزمية؟",
    choices: [
      "لغة تتكون من 0 و1",
      "سلسلة من الخطوات المنظمة لحل مشكلة",
      "جهاز يقوم بالمعالجة",
      "برنامج مكتوب بلغة الآلة"
    ],
    correct: 1,
    explain: "المنهج يعرّف الخوارزمية بأنها سلسلة خطوات لحل مشكلة.",
    page: 16,
    cite: ""
  },
  {
    q: "لغة الآلة تتكون من:",
    choices: ["حروف وأرقام", "رموز خاصة", "0 و 1", "أوامر إنجليزية"],
    correct: 2,
    explain: "المنهج يذكر أن لغة الآلة ثنائية (0 و1).",
    page: 17,
    cite: "7"
  },
  {
    q: "أي من التالي يُعد من أنماط بناء البرامج الأساسية؟",
    choices: ["التسلسل", "الشرط", "التكرار", "جميع ما سبق"],
    correct: 3,
    explain: "المنهج يذكر الأنماط الثلاثة: التسلسل/الشرط/التكرار.",
    page: 21,
    cite: "8"
  },
  {
    q: "الفرق الصحيح بين المترجم (Compiler) والمفسر (Interpreter) هو:",
    choices: [
      "المترجم يترجم البرنامج كاملاً دفعة واحدة ثم ينفذه، والمفسر ينفذ سطرًا سطرًا",
      "المفسر يترجم البرنامج كاملاً دفعة واحدة",
      "لا يوجد فرق بينهما",
      "المفسر لا يحول إلى لغة الآلة"
    ],
    correct: 0,
    explain: "المنهج يوضح أن الـ Compiler يترجم كامل البرنامج ثم ينفذه، بينما الـ Interpreter ينفذ سطرًا سطرًا.",
    page: 19,
    cite: ""
  },

  // ========== Google Colab (منهج) ==========
  {
    q: "ما هو Google Colab؟",
    choices: [
      "برنامج يتم تثبيته على الجهاز",
      "بيئة برمجة جاهزة تعمل عبر المتصفح",
      "لغة برمجة",
      "نظام تشغيل"
    ],
    correct: 1,
    explain: "المنهج يذكر أنه بيئة سحابية تعمل عبر المتصفح وتشبه Jupyter Notebook.",
    page: 8,
    cite: ""
  },
  {
    q: "ما الرابط الصحيح للدخول إلى Google Colab؟",
    choices: ["google.com", "python.org", "colab.research.google.com", "github.com"],
    correct: 2,
    explain: "مذكور نصًا في الدرس.",
    page: 8,
    cite: ""
  },

  // ========== بايثون (منهج) ==========
  {
    q: "بايثون تميز بين الأحرف الكبيرة والصغيرة في أسماء المتغيرات (Case Sensitive).",
    choices: ["صح", "خطأ"],
    correct: 0,
    explain: "المنهج يذكر صراحة: Python Case Sensitive.",
    page: 34,
    cite: "12"
  },
  {
    q: "القيمة التي يرجعها input() في بايثون تكون من نوع:",
    choices: ["int دائمًا", "float دائمًا", "string (نص)", "boolean"],
    correct: 2,
    explain: "المنهج يوضح أن input() يُرجع نصًا (string).",
    page: 32,
    cite: "13"
  },
  {
    q: "كتابة print بهذه الطريقة primt تُسبب غالبًا:",
    choices: ["SyntaxError", "NameError", "TypeError", "Logical Error"],
    correct: 1,
    explain: "هذا خطأ اسم (اسم دالة غير معروف)؛ لأن primt غير معرّفة (وليست خطأ صياغة).",
    page: null,
    cite: null,
    note: "هذا استنتاج بايثون قياسي. الدرس عرض مثال TypeError/أمثلة أخطاء، لكن لم أعثر على نص حرفي عن primt تحديدًا أثناء البحث."
  },
  {
    q: "عند كتابة Print بدل print في بايثون، نوع الخطأ غالبًا هو:",
    choices: ["SyntaxError", "NameError", "TypeError", "Logical Error"],
    correct: 1,
    explain: "لأن بايثون Case Sensitive؛ و Print اسم مختلف عن print، فيظهر عادة NameError (اسم غير معرّف).",
    page: 34,
    cite: "14"
  }
];

// ====== حالة الاختبار ======
let current = 0;
let score = 0;
let answered = false;

// ====== أدوات واجهة ======
function clearAnswers() {
  elAnswers.innerHTML = "";
}

function setResult(html) {
  elResult.innerHTML = html;
}

function renderQuestion() {
  if (!elQuestion || !elAnswers || !elResult || !btnNext) return;

  answered = false;
  btnNext.disabled = true;

  clearAnswers();
  setResult("");

  const q = questions[current];

  // عنوان السؤال + رقم + Session Code
  elQuestion.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
      <div><b>السؤال ${current + 1} من ${questions.length}:</b> ${escapeHtml(q.q)}</div>
      <div style="opacity:.85;font-size:.95em;">رمز الجلسة: <b>${sessionCode}</b></div>
    </div>
  `;

  // أزرار الخيارات
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.style.cssText = `
      display:block;width:100%;text-align:right;
      padding:12px 14px;margin:10px 0;border-radius:10px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);color:#fff;cursor:pointer;
      font-size:1rem;
    `;
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(idx));
    elAnswers.appendChild(btn);
  });
}

function handleAnswer(selectedIdx) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const buttons = Array.from(elAnswers.querySelectorAll("button"));

  // صح/خطأ وتلوين
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correct) {
      b.style.background = "rgba(46, 204, 113, .25)";
      b.style.borderColor = "rgba(46, 204, 113, .75)";
    }
    if (idx === selectedIdx && idx !== q.correct) {
      b.style.background = "rgba(231, 76, 60, .25)";
      b.style.borderColor = "rgba(231, 76, 60, .75)";
    }
  });

  const isCorrect = selectedIdx === q.correct;
  if (isCorrect) score++;

  // الدرجة أولاً + شرح + صفحة
  const pageText = q.page ? `صفحة المنهج: <b>${q.page}</b>` : `صفحة المنهج: <b>غير متاحة نصيًا هنا</b>`;
  const citeText = q.cite ? `<div style="opacity:.9;margin-top:6px;">مرجع: ${q.cite}</div>` : "";
  const noteText = q.note ? `<div style="opacity:.85;margin-top:6px;">ملاحظة: ${escapeHtml(q.note)}</div>` : "";

  setResult(`
    <div style="padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06)">
      <div style="font-size:1.05rem;"><b>درجتك الآن:</b> ${score} / ${questions.length}</div>
      <div style="margin-top:6px;"><b>النتيجة:</b> ${isCorrect ? "✅ إجابة صحيحة" : "❌ إجابة خاطئة"}</div>
      <div style="margin-top:10px;"><b>التصحيح:</b> الإجابة الصحيحة هي: <b>${escapeHtml(q.choices[q.correct])}</b></div>
      <div style="margin-top:10px;"><b>الشرح:</b> ${escapeHtml(q.explain)}</div>
      <div style="margin-top:10px;">${pageText}</div>
      ${citeText}
      ${noteText}
    </div>
  `);

  btnNext.disabled = false;
  btnNext.textContent = current === questions.length - 1 ? "عرض النتيجة النهائية" : "السؤال التالي";
}

function showFinal() {
  clearAnswers();
  elQuestion.innerHTML = `<b>انتهى الاختبار</b>`;
  setResult(`
    <div style="padding:14px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06)">
      <div style="font-size:1.1rem;"><b>الدرجة النهائية:</b> ${score} / ${questions.length}</div>
      <div style="margin-top:6px;"><b>رمز الجلسة (بدون اسم):</b> ${sessionCode}</div>
      <div style="margin-top:10px;opacity:.9;">يمكنك أخذ لقطة شاشة وإرسالها كإثبات (بدون اسم).</div>
      <div style="margin-top:12px;">
        <button id="restartBtn" style="
          padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.18);
          background:rgba(255,255,255,.10);color:#fff;cursor:pointer;
        ">إعادة الاختبار</button>
      </div>
    </div>
  `);

  const restartBtn = document.getElementById("restartBtn");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
    });
  }
}

btnNext?.addEventListener("click", () => {
  if (current === questions.length - 1) {
    showFinal();
    return;
  }
  current++;
  renderQuestion();
});

// ====== مساعدات ======
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// تشغيل أول سؤال
renderQuestion();
