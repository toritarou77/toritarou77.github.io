'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  

  function getCalendarHead() {
    // -----------------------------------------------------
    // カレンダーに表示する前月の末日と、前月の日の数を取得する
    // -----------------------------------------------------
    const dates = [];
    
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();
    // console.log("前月の日の数＝" + n);
    
    let yyyy = year;
    let mm = month + 1;      // mm には歴月を編集する mm: 1 - 12  month: 0 11   

    // 前月を求める
    mm = mm -1;
    if (mm === 0) {
      yyyy--;
      mm = 12;
    }

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
        yymmdd: `${yyyy}/${String(mm).padStart(2, '0')}/${String(d - i).padStart(2,'0')}`,
      });
    }
    // console.log("前月の情報");
    // console.log(dates);
    return dates;
  }
  

  function getCalendarBody() {
    // -----------------------------------------------------
    // カレンダー dates に 今月の日付１から月末日までを 編集する
    // -----------------------------------------------------
    const dates = [];     // date:日付の配列 [空], day:曜日
    
    const lastDate = new Date(year, month + 1, 0).getDate();

    let yyyy = year;
    let mm = month + 1;      // mm には歴月を編集する mm: 1 - 12  month: 0 11 

    for (let i = 1; i <= lastDate; i++) {
        dates.push({
          date: i, 
          isToday: false, 
          isDisabled: false,
          yymmdd: `${year}/${String(mm).padStart(2, '0')}/${String(i).padStart(2,'0')}`,              
        });
    }

    // 処理日の場合、太字
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    // console.log("今月の情報");
    // console.log(dates);
    return dates;
  }
    

  function getCalendarTail() {
    // -----------------------------------------------------
    // カレンダーに表示する翌月の情報を取得する
    // -----------------------------------------------------
    const dates = [];

    // 今月の末日が週の何日目かを取得
    const lastDay = new Date(year, month + 1, 0).getDay();
    // console.log("lastDay=" + lastDay);

    let yyyy = year;
    let mm = month + 1;      // mm には歴月を編集する mm: 1 - 12  month: 0 11   
    
    // 翌月を求める
    mm = mm + 1;
    if (mm > 12) {
      yyyy++;
      mm = 1;
    }

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
        yymmdd: `${yyyy}/${String(mm).padStart(2, '0')}/${String(i).padStart(2,'0')}`,
      });
    }

    // console.log("翌月の情報");
    // console.log(dates);
    return dates;
  }

  function clearCalendar() {
    // -----------------------------------------------------
    // カレンダーに表示するまえの初期化
    // -----------------------------------------------------
    const tbody = document.querySelector('tbody');
  
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
      
  }

  function renderTitle() {
    // -----------------------------------------------------
    // 表示するカレンダーの年月 "title" の編集
    // -----------------------------------------------------
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    // -----------------------------------------------------
    // 表示するカレンダーの前月、当月、翌月　の編集
    // -----------------------------------------------------
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    // console.log(dates)

    const weeks = [];
    const weeksCount = dates.length / 7;
  
    for (let i = 0; i < weeksCount; i++) {
        weeks.push(dates.splice(0, 7));
    }

    // console.log("カレンダー週毎の情報");
    // console.log(weeks);

    weeks.forEach(week => {
      const tr = document.createElement('tr');

      let index = 0;      // 一週間のカウント 日曜が1、月曜が2、火曜が3・・ 土曜日が7

      week.forEach(date => {

        index++;

        const td = document.createElement('td');
        td.textContent = date.date;
        
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        const holidays = ['2020/01/01','2020/01/13','2020/02/11','2020/02/23','2020/02/24','2020/03/20','2020/04/29','2020/05/03','2020/05/04','2020/05/05','2020/05/06','2020/07/23','2020/07/24','2020/08/10','2020/09/21','2020/09/22','2020/11/03','2020/11/23','2021/01/01','2020/01/11','2021/02/11','2021/02/23','2021/03/20','2021/04/29','2021/05/03','2021/05/04','2021/05/05','2021/07/22','2021/07/23','2021/08/08','2021/08/09','2021/09/20','2021/09/23','2021/10/11','2021/11/03','2021/11/23','2022/01/01','2022/01/10','2022/02/11','2022/02/23','2022/03/21','2022/04/29','2022/05/03','2022/05/04','2022/05/05','2022/07/18','2022/08/11','2022/09/19','2022/09/23','2022/10/10','2022/11/03','2022/11/23'];

        let result = holidays.indexOf( date.yymmdd );   // not found 時は、result が -1
        if (result != -1){
          td.classList.add('holiday');                  // 祭日は、赤表示(日曜は、first-child使用)
        } else {
          if (index === 7){                             // 土曜日は、青表示
            // console.log("date.yymmdd=" + date.yymmdd);
            td.classList.add('saturday');
          }
        }

        tr.appendChild(td);
      });

      document.querySelector('tbody').appendChild(tr);
    });

  }

  function createCalendar() {
    // -----------------------------------------------------
    // カレンダーに表示する翌月の情報を取得する
    // -----------------------------------------------------
    clearCalendar();
    renderTitle();
    renderWeeks();
  }
  

  document.getElementById('prev').addEventListener('click', () => {
    // -----------------------------------------------------
    // 前月ボタン <th id="prev">&laquo;</th> クリック時の操作
    // -----------------------------------------------------
    month--;
    if (month < 0) {
      year--;
      month = 11;   // 12月
    }
  
    createCalendar();
  });


  document.getElementById('next').addEventListener('click', () => {
    // -----------------------------------------------------
    // 翌月ボタン  <th id="next">&raquo;</th> クリック時の操作
    // -----------------------------------------------------
    month++;
    if (month > 11) {
      year++;
      month = 0;   // 1月
    }
  
    createCalendar();
  });


  document.getElementById('today').addEventListener('click', () => {
    // -----------------------------------------------------
    // "today"ボタン td id="today" colspan="7">Today</td> クリック時の操作
    // -----------------------------------------------------
    year = today.getFullYear();
    month = today.getMonth();
  
    createCalendar();
  });

  createCalendar();

}