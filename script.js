"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var elQuestion = document.getElementById("question");
  var elAnswers = document.getElementById("answers");
  var elResult = document.getElementById("result");
  var btnNext = document.getElementById("nextBtn");

  if (!elQuestion || !elAnswers || !elResult || !btnNext) {
    document.body.innerHTML =
      '<div style="direction:rtl;font-family:Arial;padding:16px;line-height:1.8">' +
      "<h2>خطأ في index.html</h2>" +
      "<p>لازم تكون العناصر موجودة بهذه الـ IDs:</p>" +
      '<pre style="background:#111;color:#fff;padding:12px;border-radius:10px">' +
      "#question\n#answers\n#result\n#nextBtn" +
      "</pre></div>";
    return;
  }

  // للتأكد أن زر التالي يعمل والسكربت يتحكم فيه
  btnNext.disabled = true;

  var sessionCode = "S-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  // ✅ هنا خليت الأسئلة فيها اختيارات واضحة + صح/خطأ
  var questions = [
    // MCQ (اختيارات)
    {
      q: "أي من التالي يُعد من مكونات الحاسب الأساسية؟",
      choices: ["برنامج Word", "الإدخال والمعالجة والتخزين والمخرجات", "متصفح الإنترنت", "ملف نصي"],
      correct: 1,
      explain: "المكونات الأساسية: Input / Processing / Memory & Storage / Output.",
      page: 6
    },
    {
      q: "ما هي اللغة التي يفهمها الحاسب مباشرة؟",
      choices: ["لغة التجميع", "لغة الآلة", "لغة عالية المستوى", "بايثون"],
      correct: 1,
      explain: "الحاسب يفهم مباشرة لغة الآلة (0 و1).",
      page: 9
    },
    {
      q: "المترجم Compiler يقوم بـ:",
      choices: ["ترجمة البرنامج كاملًا ثم تنفيذه", "ترجمة سطر بسطر", "حذف الأخطاء تلقائيًا", "تشغيل الطابعة"],
      correct: 0,
      explain: "المترجم يترجم البرنامج كاملًا ثم يُنفّذ الناتج.",
      page: 18
    },
    {
      q: "المفسر Interpreter يقوم بـ:",
      choices: ["ترجمة البرنامج كاملًا ثم تنفيذه", "قراءة تعليمة واحدة ثم ترجمتها وتنفيذها", "ترجمة فقط بدون تنفيذ", "تشغيل الملفات الصوتية"],
      correct: 1,
      explain: "المفسر ينفذ سطرًا سطرًا (تعليمة واحدة في كل مرة).",
      page: 18
    },

    // True/False (صح/خطأ) — يعتبر أيضًا خيارات (زرين)
    {
      q: "لغة الآلة تتكون من الرمزين (0 و1).",
      choices: ["صح", "خطأ"],
      correct: 0,
      explain: "لغة الآلة Binary (0/1).",
      page: 9
    },
    {
      q: "بايثون تعمل على جميع أنظمة التشغيل (Windows/Mac/Linux).",
      choices: ["صح", "خطأ"],
      correct: 0,
      explain: "المنهج يذكر أنها تعمل على جميع أنظمة التشغيل.",
      page: 20
    },
    {
      q: "Google Colab يحتاج تثبيت على الجهاز حتى يعمل.",
      choices: ["صح", "خطأ"],
      correct: 1,
      explain: "Colab يعمل عبر المتصفح بدون تثبيت.",
      page: 24
    }
  ];

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
    btn.style.transition = "all .15s ease";

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
      '<div style="margin-top:10px;"><strong>رقم الصفحة:</strong> ' + q.page + "</div>" +
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
      '<div style="margin-top:10px; opacity:.9;">رمز الجلسة: <strong>' + sessionCode + "</strong></div>" +
      "</div>";
  }

  btnNext.addEventListener("click", function () {
    if (!answered) return;
    if (currentIndex === questions.length - 1) return showFinal();
    currentIndex++;
    renderQuestion();
  });

  renderQuestion();
});
