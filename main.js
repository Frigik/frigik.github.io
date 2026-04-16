/**
 * Модуль: интерактивные тесты + анимации + "Показать ещё" + прогресс-бар
 * Чистый JS, без зависимостей. Вариант 4: красный/серый/белый + Roboto/Open Sans
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // === 1. Анимации при скролле (Intersection Observer) ===
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });
  
  // === 2. Подсветка активной страницы в навигации ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // === 3. Логика тестов (только на quiz.html) ===
  const quizForm = document.getElementById('ai-quiz');
  const quizContainer = document.querySelector('.quiz-questions');
  
  if (quizForm && quizContainer) {
    
    // === МАССИВ ВОПРОСОВ (25 штук) ===
    const questions = [
      {id:'q1',question:'Что такое «промпт» при работе с ИИ-инструментами?',options:[{text:'Ошибка в коде',correct:false},{text:'Запрос или инструкция для ИИ',correct:true},{text:'Тип переменной',correct:false},{text:'Название функции',correct:false}]},
      {id:'q2',question:'Какой инструмент ИИ лучше всего подходит для генерации кода?',options:[{text:'Excel',correct:false},{text:'GitHub Copilot',correct:true},{text:'Photoshop',correct:false},{text:'Trello',correct:false}]},
      {id:'q3',question:'Что НЕ стоит делать при использовании ИИ для кода?',options:[{text:'Проверять код',correct:false},{text:'Копировать без понимания',correct:true},{text:'Указывать язык',correct:false},{text:'Тестировать',correct:false}]},
      {id:'q4',question:'Как ИИ помогает в отладке?',options:[{text:'Запускает за вас',correct:false},{text:'Предлагает причины ошибок',correct:true},{text:'Заменяет тесты',correct:false},{text:'Гарантирует отсутствие багов',correct:false}]},
      {id:'q5',question:'Что такое «галлюцинация» ИИ?',options:[{text:'Рисует картинки',correct:false},{text:'Генерирует нерабочий код с выдуманными функциями',correct:true},{text:'Отказывается отвечать',correct:false},{text:'Медленно работает',correct:false}]},
      {id:'q6',question:'Какой промпт наиболее эффективен?',options:[{text:'Напиши код',correct:false},{text:'Сделай что-нибудь',correct:false},{text:'Напиши функцию на Python с комментариями, которая считает среднее',correct:true},{text:'Код код код',correct:false}]},
      {id:'q7',question:'Зачем указывать язык в промпте?',options:[{text:'Не обязательно',correct:false},{text:'Чтобы получить код в нужном синтаксисе',correct:true},{text:'Для красоты',correct:false},{text:'Не влияет',correct:false}]},
      {id:'q8',question:'Что такое «контекст» в диалоге с ИИ?',options:[{text:'Список ошибок',correct:false},{text:'Предыдущие сообщения, которые учитывает ИИ',correct:true},{text:'Имя файла',correct:false},{text:'Версия ОС',correct:false}]},
      {id:'q9',question:'Как ИИ помогает с документацией?',options:[{text:'Не может',correct:false},{text:'Генерирует описание функций на основе кода',correct:true},{text:'Только переводит',correct:false},{text:'Только вручную',correct:false}]},
      {id:'q10',question:'Что делать после получения кода от ИИ?',options:[{text:'Сразу вставить',correct:false},{text:'Протестировать и понять логику',correct:true},{text:'Удалить комментарии',correct:false},{text:'Отправить без проверки',correct:false}]},
      {id:'q11',question:'Какой этический принцип важен?',options:[{text:'Скрывать использование',correct:false},{text:'Копировать чужие работы',correct:false},{text:'Указывать, что использовался ИИ',correct:true},{text:'Полностью доверять',correct:false}]},
      {id:'q12',question:'Что такое итеративный промптинг?',options:[{text:'Один запрос — идеальный ответ',correct:false},{text:'Постепенное уточнение запросов',correct:true},{text:'Повтор одного запроса',correct:false},{text:'Только короткие запросы',correct:false}]},
      {id:'q13',question:'Как ИИ помогает в планировании?',options:[{text:'Не может',correct:false},{text:'Предлагает структуру и список задач',correct:true},{text:'Выполняет всё за вас',correct:false},{text:'Заменяет команду',correct:false}]},
      {id:'q14',question:'Что делать, если ИИ дал код с ошибкой?',options:[{text:'Удалить ИИ',correct:false},{text:'Проанализировать и уточнить промпт',correct:true},{text:'Никогда не использовать',correct:false},{text:'Надеяться, что ошибка исчезнет',correct:false}]},
      {id:'q15',question:'Что НЕБЕЗОПАСНО при использовании ИИ?',options:[{text:'Генерация шаблона',correct:false},{text:'Передача паролей ИИ',correct:true},{text:'Получение примеров',correct:false},{text:'Генерация идей',correct:false}]},
      {id:'q16',question:'Что такое «ограничение контекста»?',options:[{text:'Лимит токенов за запрос',correct:true},{text:'Работа только в определённых браузерах',correct:false},{text:'Только один язык',correct:false},{text:'Не более 10 слов',correct:false}]},
      {id:'q17',question:'Как ИИ улучшает читаемость кода?',options:[{text:'Предлагает понятные имена и комментарии',correct:true},{text:'Удаляет отступы',correct:false},{text:'Заменяет комментарии на эмодзи',correct:false},{text:'Не может',correct:false}]},
      {id:'q18',question:'Что значит «верифицировать ответ ИИ»?',options:[{text:'Скопировать без изменений',correct:false},{text:'Проверить корректность перед использованием',correct:true},{text:'Отправить другу',correct:false},{text:'Сохранить и забыть',correct:false}]},
      {id:'q19',question:'Какой подход к ИИ в обучении эффективен?',options:[{text:'Полностью делегировать',correct:false},{text:'Использовать как помощника, но разбираться самому',correct:true},{text:'Только копировать',correct:false},{text:'Избегать ИИ',correct:false}]},
      {id:'q20',question:'Что такое few-shot prompting?',options:[{text:'Привести несколько примеров желаемого формата',correct:true},{text:'Запрос только три раза',correct:false},{text:'Запрос из одного слова',correct:false},{text:'Игнорируемый запрос',correct:false}]},
      {id:'q21',question:'Как ИИ помогает писать тесты?',options:[{text:'Не может',correct:false},{text:'Генерирует тестовые данные и шаблоны',correct:true},{text:'Запускает тесты за вас',correct:false},{text:'Заменяет тестирование',correct:false}]},
      {id:'q22',question:'Что учитывать при использовании ИИ на уроке?',options:[{text:'Только скорость',correct:false},{text:'Соответствие требованиям и возможность объяснить',correct:true},{text:'Длину кода',correct:false},{text:'Эмодзи в комментариях',correct:false}]},
      {id:'q23',question:'Какой инструмент преобразует комментарий в код?',options:[{text:'Блокнот',correct:false},{text:'GitHub Copilot или аналог',correct:true},{text:'Калькулятор',correct:false},{text:'Графический редактор',correct:false}]},
      {id:'q24',question:'Что делать, если ИИ предлагает несколько решений?',options:[{text:'Выбрать первый',correct:false},{text:'Сравнить и выбрать лучший',correct:true},{text:'Использовать все',correct:false},{text:'Попросить ИИ выбрать',correct:false}]},
      {id:'q25',question:'Как использовать ИИ для рефакторинга?',options:[{text:'Попросить улучшить: упростить, убрать дубли, улучшить имена',correct:true},{text:'Удалить весь код',correct:false},{text:'ИИ не может',correct:false},{text:'Только вручную',correct:false}]}
    ];

    // Рендер вопросов
    try {
      questions.forEach((q) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question animate-on-scroll';
        questionEl.dataset.autoShow = 'true';
        questionEl.innerHTML = `
          <p><strong>${q.question}</strong></p>
          <div class="options" id="options-${q.id}">
            ${q.options.map((opt, idx) => `
              <label class="option">
                <input type="radio" name="${q.id}" value="${idx}" data-correct="${opt.correct}">
                <span>${opt.text}</span>
              </label>
            `).join('')}
          </div>
          <div class="feedback" id="feedback-${q.id}"></div>
        `;
        quizContainer.appendChild(questionEl);
      });
      
      // Мгновенно показываем вопросы квиза
      setTimeout(() => {
        document.querySelectorAll('.quiz-questions .animate-on-scroll[data-auto-show="true"]').forEach(el => {
          el.classList.add('visible');
        });
      }, 50);
      
    } catch (err) {
      console.error('Ошибка рендеринга вопросов:', err);
      quizContainer.innerHTML = '<p style="color:var(--color-red-primary)">⚠ Не удалось загрузить вопросы. Обновите страницу.</p>';
      return;
    }
    
    // === Прогресс-бар квиза ===
    const progressFill = document.getElementById('progress-fill');
    const progressCount = document.getElementById('progress-count');
    const progressTotal = document.getElementById('progress-total');
    
    function updateProgress() {
      if (!progressFill || !progressCount) return;
      const answeredQuestions = new Set(
        Array.from(quizForm.querySelectorAll('input[type="radio"]:checked'))
          .map(input => input.name)
      ).size;
      const percent = (answeredQuestions / questions.length) * 100;
      progressFill.style.width = `${percent}%`;
      progressCount.textContent = answeredQuestions;
    }
    
    if (progressTotal) progressTotal.textContent = questions.length;
    quizContainer.addEventListener('change', updateProgress);
    
    // === Проверка ответов ===
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let score = 0;
      
      questions.forEach(q => {
        const selected = quizForm.querySelector(`input[name="${q.id}"]:checked`);
        const feedback = document.getElementById(`feedback-${q.id}`);
        
        if (!selected) {
          feedback.textContent = '⚠ Выберите вариант ответа';
          feedback.className = 'feedback incorrect';
          return;
        }
        
        const isCorrect = selected.dataset.correct === 'true';
        if (isCorrect) {
          score++;
          feedback.textContent = '✅ Верно!';
          feedback.className = 'feedback correct';
        } else {
          feedback.textContent = '❌ Неверно. Попробуйте ещё раз.';
          feedback.className = 'feedback incorrect';
        }
      });
      
      const resultEl = document.getElementById('quiz-result');
      if (resultEl) {
        resultEl.style.display = 'block';
        resultEl.textContent = `Ваш результат: ${score} из ${questions.length}`;
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    // === Кнопка "Сбросить тест" ===
    const resetBtn = document.getElementById('reset-quiz');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Сбросить все радио-кнопки
        quizForm.querySelectorAll('input[type="radio"]').forEach(input => {
          input.checked = false;
        });
        // Скрыть все фидбэки
        quizForm.querySelectorAll('.feedback').forEach(fb => {
          fb.style.display = 'none';
          fb.className = 'feedback';
        });
        // Скрыть результат
        const resultEl = document.getElementById('quiz-result');
        if (resultEl) {
          resultEl.style.display = 'none';
          resultEl.textContent = '';
        }
        // Сбросить прогресс-бар
        if (progressFill) progressFill.style.width = '0%';
        if (progressCount) progressCount.textContent = '0';
        // Скролл вверх
        quizForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
  
  // === 4. Кнопка "Показать ещё" для видео (только на lessons.html) ===
const showMoreBtn = document.getElementById('show-more-videos');
if (showMoreBtn) {
  const hiddenLessons = Array.from(document.querySelectorAll('.lesson-card.hidden:not(.visible)'));
  
  if (hiddenLessons.length > 0) {
    showMoreBtn.addEventListener('click', () => {
      hiddenLessons.forEach((card, index) => {
        setTimeout(() => {
          // Удаляем hidden, добавляем visible — CSS с !important обработает display
          card.classList.remove('hidden');
          card.classList.add('visible');
          // Force reflow для гарантии запуска анимации
          void card.offsetWidth;
        }, index * 100);
      });
      
      // Плавное скрытие кнопки
      showMoreBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      showMoreBtn.style.opacity = '0';
      showMoreBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        showMoreBtn.style.display = 'none';
      }, 350);
    });
  } else {
    showMoreBtn.style.display = 'none';
  }
}
});