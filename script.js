/* ==========================================================
   Python Quiz (Lesson 1 - PYT103) — 40 Questions
   ✅ MCQ + True/False only
   ✅ Instant correction + colors + explanation + page number
   ✅ Show score first after each answer + final score
   ✅ Anonymous: auto Session Code (no name)
   ----------------------------------------------------------
   Requires in index.html:
   #question  #answers  #result  #nextBtn
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var elQuestion = document.getElementById("question");
  var elAnswers = document.getElementById("answers");
  var elResult = document.getElementById("result");
  var btnNext = document.getElementById("nextBtn");

  // If required elements are missing
  if (!elQuestion || !elAnswers || !elResult || !btnNext) {
    document.body.innerHTML =
      '<div style="direction:rtl;font-family:Arial;padding:16px;line-height:1.8">' +
      "<h2>خطأ في index.html</h2>" +
      "<p>تأكد من وجود العناصر التالية بالـ IDs:</p>" +
      '<pre style="background:#111;color:#fff;padding:12px;border-radius:10px">' +
      "#question\n#answers\n#result\n#nextBtn" +
      "</pre>" +
      "</div>";
    return;
  }

  // Ensure Next button is clickable (script controls disable/enable)
  btnNext.disabled = true;

  // Anonymous session code
  var sessionCode = "S-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  // 40 Questions bank (as provided)
  var questions = [
    { q: "الحاسب لا يفهم مباشرة إلا لغة واحدة هي لغة الآلة (Machine Language).", choices: ["صح", "خطأ"], correct: 0, explain: "المنهج يذكر أن الحاسب يفهم لغة واحدة للتعامل معه وهي لغة الآلة.", page: 9 },
    { q: "لغة الآلة تتكون من الرمزين (0 و 1).", choices: ["صح", "خطأ"], correct: 0, explain: "مذكور أن لغة الآلة مكوّنة من رمزين فقط (0,1).", page: 9 },
    { q: "أهمية لغات البرمجة أنها تُبسّط التواصل بين المبرمج والحاسب بدل التعامل المباشر مع (0 و1).", choices: ["صح", "خطأ"], correct: 0, explain: "نستخدم لغات البرمجة لتبسيط التواصل بين المبرمج والحاسب.", page: 9 },
    { q: "لغات البرمجة عالية المستوى قريبة من لغة الإنسان وتسهّل كتابة البرامج وقراءتها.", choices: ["صح", "خطأ"], correct: 0, explain: "اللغات عالية المستوى قريبة من لغة الإنسان وتسهّل كتابة البرامج وقراءتها.", page: 11 },
    { q: "البرنامج المكتوب بلغة عالية المستوى يُسمى (Source Code / Source Program).", choices: ["صح", "خطأ"], correct: 0, explain: "المنهج يذكر أن البرنامج المكتوب باللغات عالية المستوى يسمى Source Code/Program.", page: 12 },
    { q: "حتى يتم تنفيذ البرنامج يجب ترجمته إلى لغة الآلة.", choices: ["صح", "خطأ"], correct: 0, explain: "البرنامج يجب أن يُترجم إلى لغة الآلة حتى يُنفذ.", page: 12 },
    { q: "الأداة التي تُستخدم لترجمة البرنامج إلى لغة الآلة هي:", choices: ["الطابعة", "المترجم Compiler أو المفسر Interpreter", "لوحة المفاتيح", "الشاشة"], correct: 1, explain: "الترجمة تتم باستخدام Compiler أو Interpreter.", page: 12 },
    { q: "اللغة منخفضة المستوى تكون:", choices: ["قريبة من العتاد وتمنح تحكمًا أدق لكنها أصعب", "قريبة جدًا من لغة الإنسان وسهلة جدًا", "لا تحتاج ترجمة للآلة", "لا علاقة لها بالذاكرة والمسجلات"], correct: 0, explain: "منخفضة المستوى قريبة من العتاد وتحكمها أدق لكنها أصعب وأقل قابلية للنقل.", page: 13 },
    { q: "لغة التجميع (Assembly) هي:", choices: ["لغة عالية المستوى مثل Python", "تعليمات ثنائية 0 و1 فقط", "تمثيل رمزي قصير للتعليمات الثنائية ويحوّلها Assembler", "لغة لا تحتاج أي محول"], correct: 2, explain: "Assembly تمثيل رمزي للتعليمات الثنائية ويحولها Assembler إلى 0 و1.", page: 14 },
    { q: "المفسر Interpreter يقوم بـ:", choices: ["ترجمة البرنامج كاملًا ثم تنفيذه", "قراءة تعليمة واحدة وترجمتها وتنفيذها مباشرة", "حذف الأخطاء نهائيًا", "تشغيل الطابعة"], correct: 1, explain: "المفسر يقرأ تعليمة واحدة ثم يترجمها وينفذها مباشرة.", page: 18 },
    { q: "المترجم Compiler يقوم بـ:", choices: ["تنفيذ تعليمة واحدة فقط", "ترجمة البرنامج كاملًا إلى لغة الآلة ثم تنفيذه", "قراءة إدخال المستخدم", "كتابة تعليقات فقط"], correct: 1, explain: "المترجم يترجم البرنامج كاملًا ثم يتم تنفيذ الناتج.", page: 18 },
    { q: "الخوارزميات هي سلسلة خطوات يمكن اتباعها لإيجاد الحل المطلوب.", choices: ["صح", "خطأ"], correct: 0, explain: "الخوارزميات سلسلة خطوات لإيجاد الحل المطلوب.", page: 8 },
    { q: "من مكونات الحاسب الأساسية كما وردت في المنهج:", choices: ["الإدخال والمعالجة والتخزين والمخرجات", "المتصفح فقط", "الطابعة فقط", "برنامج Word"], correct: 0, explain: "المكونات: Input / Processing / Memory & Storage / Output.", page: 6 },
    { q: "من أمثلة أجهزة الإدخال في المنهج:", choices: ["الطابعة", "لوحة المفاتيح والفأرة والميكروفون وشاشة اللمس", "السماعات فقط", "ملفات الإخراج"], correct: 1, explain: "أمثلة الإدخال: لوحة المفاتيح، الفأرة، الميكروفون، شاشة اللمس.", page: 6 },
    { q: "وحدة المعالجة المركزية (CPU) هي قلب تنفيذ أوامر البرامج وتقوم بالحسابات واتخاذ القرارات.", choices: ["صح", "خطأ"], correct: 0, explain: "CPU تنفذ التعليمات وتقوم بالحسابات واتخاذ القرارات.", page: 6 },
    { q: "الذاكرة الرئيسية سريعة وقريبة من المعالج لكنها تخزين مؤقت يزول بانقطاع الطاقة.", choices: ["صح", "خطأ"], correct: 0, explain: "المحتوى يزول بانقطاع الطاقة (تخزين مؤقت).", page: 6 },
    { q: "الذاكرة الثانوية أبطأ لكنها تحتفظ بالبيانات والبرامج عند إيقاف التشغيل.", choices: ["صح", "خطأ"], correct: 0, explain: "تخزين دائم يحتفظ بالبيانات عند إيقاف التشغيل.", page: 6 },
    { q: "المخرجات في المنهج تشمل:", choices: ["عرض النتائج على الشاشة وتشغيل الصوت والكتابة إلى ملفات", "الماوس فقط", "الكيبورد فقط", "الذاكرة الرئيسية"], correct: 0, explain: "يعرض النتائج على الشاشة، يشغّل الصوت، ويكتب إلى ملفات.", page: 6 },
    { q: "Networking يعني نقل البيانات عبر شبكات متصلة وقد يُنظر له كامتداد للتخزين.", choices: ["صح", "خطأ"], correct: 0, explain: "Networking: نقل البيانات عبر شبكات متصلة وقد يُنظر له كامتداد للتخزين.", page: 6 },
    { q: "من المكونات الأساسية للبرامج كما ورد في المنهج:", choices: ["المدخلات والمخرجات والتسلسل والشرط والتكرار وإعادة الاستخدام", "الشاشة والمعالج فقط", "الإنترنت فقط", "الذاكرة الثانوية فقط"], correct: 0, explain: "المنهج يسرد هذه المكونات الأساسية.", page: 15 },
    { q: "التنفيذ التسلسلي يعني تنفيذ البرنامج خطوة بعد خطوة.", choices: ["صح", "خطأ"], correct: 0, explain: "التسلسل = خطوة بعد خطوة.", page: 15 },
    { q: "الشرط يعني تنفيذ تعليمات معينة عند تحقق شرط محدد.", choices: ["صح", "خطأ"], correct: 0, explain: "الشرط = تنفيذ عند تحقق شرط.", page: 15 },
    { q: "التكرار يعني تكرار تنفيذ تعليمات عددًا من المرات أو حتى يتحقق شرط معين.", choices: ["صح", "خطأ"], correct: 0, explain: "التكرار = تكرار لعدد مرات أو حتى شرط.", page: 15 },
    { q: "إعادة الاستخدام تعني تجميع التعليمات في دوال قابلة لإعادة الاستدعاء بدل تكرار الكود.", choices: ["صح", "خطأ"], correct: 0, explain: "إعادة الاستخدام = دوال قابلة لإعادة الاستدعاء.", page: 15 },
    { q: "بايثون طُورت في معهد CWI وأول إعلان عنها كان عام 1991م.", choices: ["صح", "خطأ"], correct: 0, explain: "المعلومة موجودة في (ما هي بايثون؟).", page: 19 },
    { q: "نواة لغة بايثون كُتبت بلغة:", choices: ["Java", "C", "Python", "HTML"], correct: 1, explain: "نواة بايثون مكتوبة باستخدام C.", page: 19 },
    { q: "سبب تسمية بايثون هو إعجاب المطوّر بفرقة Monty Python.", choices: ["صح", "خطأ"], correct: 0, explain: "مذكور صراحة في المنهج.", page: 19 },
    { q: "من أسباب اختيار بايثون حسب المنهج:", choices: ["صعوبة قواعدها", "تحتاج عددًا أكبر من الأسطر دائمًا", "من أبسط اللغات ويمكن تعلمها بسرعة", "لا تعمل إلا على نظام واحد"], correct: 2, explain: "بساطة القواعد وسهولة التعلم من الأسباب المذكورة.", page: 20 },
    { q: "بايثون تعمل على جميع أنظمة التشغيل (Windows - Mac - Linux) حسب المنهج.", choices: ["صح", "خطأ"], correct: 0, explain: "مذكور أنها تعمل على جميع أنظمة التشغيل.", page: 20 },
    { q: "بايثون خيار جيد للمبتدئين لأن شيفرتها سهلة القراءة وموجزة وتزيد الإنتاجية وتقلل الأخطاء.", choices: ["صح", "خطأ"], correct: 0, explain: "هذا مضمون صفحة (لماذا بايثون؟).", page: 21 },
    { q: "من أشهر الشركات التي تستخدم بايثون حسب المنهج:", choices: ["Yahoo و Google و NASA و Microsoft", "شركة واحدة فقط", "لا توجد شركات تستخدم بايثون", "فقط شركات ألعاب"], correct: 0, explain: "القائمة مذكورة في المنهج.", page: 22 },
    { q: "في أنظمة Linux أو MacOS تكون بايثون غالبًا مثبتة مسبقًا.", choices: ["صح", "خطأ"], correct: 0, explain: "مذكور أنها مثبتة مسبقًا غالبًا على Linux/Mac.", page: 23 },
    { q: "على Windows يمكن تحميل بايثون من الموقع الرسمي python.org.", choices: ["صح", "خطأ"], correct: 0, explain: "مذكور التحميل من python.org.", page: 23 },
    { q: "بعد تثبيت بايثون على Windows يظهر برنامج باسم IDLE والغرض منه:", choices: ["تشغيل ملفات فيديو", "وسيلة للتواصل مع لغة بايثون (بيئة تطوير)", "حذف الفيروسات", "متصفح إنترنت"], correct: 1, explain: "IDLE: بيئة تطوير متكاملة للتواصل مع بايثون.", page: 23 },
    { q: "Google Colab هو بيئة بايثون جاهزة في المتصفح بدون تثبيت.", choices: ["صح", "خطأ"], correct: 0, explain: "Colab يوفر بيئة بايثون جاهزة عبر المتصفح بدون تثبيت.", page: 24 },
    { q: "يدعم Google Colab:", choices: ["CPU فقط", "GPU فقط", "CPU / GPU / TPU", "RAM فقط"], correct: 2, explain: "مذكور أنه يدعم CPU/GPU/TPU.", page: 24 },
    { q: "لتشغيل الكود في Google Colab نضغط:", choices: ["Ctrl + S", "Shift + Enter", "Alt + F4", "Enter فقط"], correct: 1, explain: "مذكور: Shift + Enter للتنفيذ.", page: 24 },
    { q: "الدالة print تطبع المخرجات على الشاشة.", choices: ["صح", "خطأ"], correct: 0, explain: "print لطباعة المخرجات على الشاشة.", page: 25 },
    { q: "الدالة input تقرأ إدخال المستخدم وتعيده كنص (String).", choices: ["صح", "خطأ"], correct: 0, explain: "input تعيد الإدخال كنص String.", page: 26 },
    { q: "من الأخطاء الشائعة في المنهج: SyntaxError مثال primt بدل print، وNameError عند استخدام متغير غير معرّف.", choices: ["العبارة صحيحة", "العبارة خاطئة"], correct: 0, explain: "هذا مذكور في صفحة الأخطاء الشائعة في المنهج.", page: 30 }
  ];

  // ----- Quiz State -----
  var currentIndex = 0;
  var score = 0;
  var answered = false;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      if (ch === "&") return "&amp;";
      if (ch === "<") return "&lt;";
      if (ch === ">") return "&gt;";
      if (ch === '"') return "&quot;";
      if (ch === "'") return "&#039;";
      return ch;
    });
  }

  function styleBtn(btn, state) {
    btn.style.transition = "all .15s ease";
    btn.style.borderRadius = "10px";
    btn.style.border = "1px solid rgba(255,255,255,.18)";
    btn.style.background = "rgba(255,255,255,.06)";
    btn.style.color = "#fff";
    btn.style.padding = "12px 14px";
    btn.style.margin = "10px 0";
    btn.style.width = "100%";
    btn.style.textAlign = "right";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "1rem";

    if (state === "correct") {
      btn.style.background = "rgba(46, 204, 113, .25)";
      btn.style.border = "1px solid rgba(46, 204, 113, .75)";
    }
    if (state === "wrong") {
      btn.style.background = "rgba(231, 76, 60, .25)";
      btn.style.border = "1px solid rgba(231, 76, 60, .75)";
    }
  }

  function renderQuestion() {
    answered = false;
    btnNext.disabled = true;

    var q = questions[currentIndex];

    elAnswers.innerHTML = "";
    elQuestion.innerHTML =
      '<div style="text-align:right;">' +
      "<strong>سؤال " + (currentIndex + 1) + " من " + questions.length + ":</strong> " +
      escapeHtml(q.q) +
      "</div>";

    elResult.innerHTML =
      '<div style="text-align:right; line-height:1.9;">' +
      '<div style="font-size:18px;"><strong>الدرجة:</strong> ' + score + " / " + questions.length + "</div>" +
      '<div style="opacity:.85;">اختر إجابة لعرض التصحيح والشرح ورقم الصفحة.</div>' +
      '<div style="opacity:.85; margin-top:6px;">رمز الجلسة: <strong>' + sessionCode + "</strong></div>" +
      "</div>";

    for (var i = 0; i < q.choices.length; i++) {
      (function (idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = q.choices[idx];
        styleBtn(btn, "neutral");
        btn.addEventListener("click", function () {
          handleAnswer(idx);
        });
        elAnswers.appendChild(btn);
      })(i);
    }

    btnNext.textContent = (currentIndex === questions.length - 1) ? "عرض النتيجة النهائية" : "السؤال التالي";
  }

  function handleAnswer(selectedIdx) {
    if (answered) return;
    answered = true;

    var q = questions[currentIndex];
    var correctIdx = q.correct;

    var buttons = elAnswers.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      styleBtn(buttons[i], "neutral");
      if (i === correctIdx) styleBtn(buttons[i], "correct");
      if (i === selectedIdx && i !== correctIdx) styleBtn(buttons[i], "wrong");
    }

    var isCorrect = (selectedIdx === correctIdx);
    if (isCorrect) score++;

    elResult.innerHTML =
      '<div style="text-align:right; line-height:1.95; padding:12px; border-radius:12px;' +
      'border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06);">' +
      '<div style="font-size:18px;"><strong>الدرجة:</strong> ' + score + " / " + questions.length + "</div>" +
      '<div style="margin-top:6px;"><strong>النتيجة:</strong> ' + (isCorrect ? "✅ إجابة صحيحة" : "❌ إجابة خاطئة") + "</div>" +
      '<div style="margin-top:10px;"><strong>الإجابة الصحيحة:</strong> ' + escapeHtml(q.choices[correctIdx]) + "</div>" +
      '<div style="margin-top:10px;"><strong>الشرح:</strong> ' + escapeHtml(q.explain) + "</div>" +
      '<div style="margin-top:10px;"><strong>رقم الصفحة في المنهج:</strong> ' + q.page + "</div>" +
      '<div style="margin-top:8px; opacity:.85;"><strong>رمز الجلسة:</strong> ' + sessionCode + "</div>" +
      "</div>";

    btnNext.disabled = false;
  }

  function showFinal() {
    elQuestion.innerHTML = "<strong>انتهى الاختبار 🎉</strong>";
    elAnswers.innerHTML = "";
    btnNext.style.display = "none";

    var percent = Math.round((score / questions.length) * 100);

    elResult.innerHTML =
      '<div style="text-align:center; line-height:2; padding:14px; border-radius:12px;' +
      'border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06);">' +
      '<div style="font-size:20px;"><strong>الدرجة النهائية</strong></div>' +
      '<div style="font-size:34px; margin:6px 0;"><strong>' + score + " / " + questions.length + "</strong></div>" +
      '<div style="font-size:18px;">' + percent + "%</div>" +
      '<div style="margin-top:10px; opacity:.9;">رمز الجلسة (بدون اسم): <strong>' + sessionCode + "</strong></div>" +
      '<button id="restartBtn" style="margin-top:12px; padding:10px 16px; border-radius:10px;' +
      'border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.10); color:#fff; cursor:pointer;">' +
      "إعادة الاختبار</button>" +
      "</div>";

    document.getElementById("restartBtn").addEventListener("click", function () {
      currentIndex = 0;
      score = 0;
      btnNext.style.display = "inline-block";
      btnNext.disabled = true;
      renderQuestion();
    });
  }

  btnNext.addEventListener("click", function () {
    if (!answered) return;

    if (currentIndex === questions.length - 1) {
      showFinal();
      return;
    }
    currentIndex++;
    renderQuestion();
  });

  // Start
  renderQuestion();
});
