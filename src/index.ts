window.Webflow ||= [];
window.Webflow.push(() => {
  function GetDataFromCalander(fromTime, toTime) {
    GetData(fromTime, toTime);
  }

  function SetGetCurrentTimeFromCalendar(date) {
    let year;
    let month;
    let day;

    //YYYYMMDD
    year = date.getFullYear();
    month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    //set current date to the list text
    $('.shift-date').text(day.toString() + '.' + month.toString() + '.' + year.toString());
    return day.toString() + '/' + month.toString() + '/' + year.toString();
  }

  function GetTomorrowFromCalendar(date) {
    let year;
    let month;
    let day;

    //YYYYMMDD
    year = date.getFullYear();

    if (isLastDayOfTheMonth(date)) {
      month = date.getMonth() + 2;

      if (month < 10) {
        month = '0' + month;
      }
      day = date.getDate();
      day = '01';

      return year.toString() + month.toString() + day.toString();
    }

    month = date.getMonth() + 1;

    if (month < 10) {
      month = '0' + month;
    }

    day = date.getDate() + 1;
    if (day < 10) {
      day = '0' + day;
    }
    return year.toString() + month.toString() + day.toString();

    //console.log(year.toString() + month.toString() + day.toString());
  }

  function GetCurrentTimeFromCalendar(date) {
    let year;
    let month;
    let day;

    //YYYYMMDD
    year = date.getFullYear();
    month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }

    //console.log(year.toString() + month.toString() + day.toString());
    return year.toString() + month.toString() + day.toString();
  }

  //het and set date to Search engine
  function getTodayDate(date) {
    let year;
    let month;
    let day;

    //YYYYMMDD
    year = date.getFullYear();

    month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    $('.shift-date').text(day.toString() + '.' + month.toString() + '.' + year.toString());
    //set current date to the list text
    return day.toString() + '/' + month.toString() + '/' + year.toString();
  }

  function setTodayDate() {
    const dt = new Date();
    getTodayDate(dt);
  }

  function isLastDayOfTheMonth(date) {
    const dt = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDayOfTheMonth = dt.getDate();
    const d = date.getDate();
    if (d == lastDayOfTheMonth) {
      return true;
    }
    return false;
  }

  const KEY_theDiamond = '72230';
  const KEY_flyingSquares = '76774';
  const KEY_phaseZero = '79999';
  const KEY_molecule = '68503';
  const KEY_darkMode = '70715';
  const KEY_goldenRatio = '68266';
  const KEY_purpleHaze = '71636';
  const KEY_valhallaLounge = '80684';
  const KEY_zebra = '81836';
  const KEY_serenity = '87402';
  const KEY_blackPearl = '87403';

  // const RED_color = "red";
  // const BLUE_color = "blue";

  const toDay = new Date();

  const toDay_YYYYMMDD = GetCurrentTimeYYYYMMDD(toDay);
  const Tomorrow_YYYYMMDD = GetTomorrowTimeYYYYMMDD(toDay);

  const key = 'MLggjSx6IfNHNLxdNyUjrzGGIRTfdRrM';

  const siteid = '5442';

  const apiSecret = 'Uz2t5tfrIRcks0Ar76We89f7IH715Gx';

  const GetData = (fromTime, toTime) => {
    const toDay = new Date();

    const dt = GetCurrentTimeYYYYMMDDHH(toDay);

    const keyForSh = siteid + key + dt + 'apptlist' + apiSecret;

    //hash it
    const sh = SHA256(keyForSh);

    //complete url
    const url =
      'https://www.tor4you.co.il/api/apptlist?siteid=' +
      siteid +
      '&key=' +
      key + // key's
      '&dt=' +
      dt +
      '&from=' +
      fromTime +
      '&to=' +
      toTime + //this Time + appointment Time
      '&sh=' +
      sh; // hash code's

    //Create a request variable and assign a new XMLHttpRequest object to it
    const request = new XMLHttpRequest();

    //open a GET req
    request.open('GET', url);

    //When the 'API request loads, do the following...
    request.onload = () => {
      //convert request to obj
      const data = JSON.parse(request.response);

      // Status 200 = Success. Status 400 = Problem.  This says if it's successful and no problems, then execute
      if (request.status >= 200 && request.status < 400) {
        // check with tor4you Status 1 = Success. Status 0 = Problem
        if (data.status === 1) {
          //get shifts time according to tor4you
          const morningShift = fromTime + '0500'; //stends for 05:00
          const eveningShift = fromTime + '1700'; //stends for 17:00

          //paint indicators in blue
          paintShiftFree('m-valhalla-lounge', 'e-valhalla-lounge');
          paintShiftFree('m-zebra', 'e-zebra');
          paintShiftFree('m-dark-mode', 'e-dark-mode');
          paintShiftFree('m-purple-haze', 'e-purple-haze');
          paintShiftFree('m-the-diamond', 'e-the-diamond');
          paintShiftFree('m-molecule', 'e-molecule');
          paintShiftFree('m-flying-squares', 'e-flying-squares');
          paintShiftFree('m-golden-ratio', 'e-golden-ratio');
          paintShiftFree('m-phase-zero', 'e-phase-zero');
          paintShiftFree('m-black-pearl', 'e-black-pearl');
          paintShiftFree('m-serenity', 'e-serenity');

          //iterate
          data.appts.forEach(function (index) {
            const morning = 'm-';
            const evening = 'e-';
            //chcking in which studio we are (studios are stuff in tor4you)
            switch (index.staff) {
              case KEY_theDiamond:
                if (index.from === morningShift) {
                  paintShiftBusy('m-the-diamond', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-the-diamond', evening);
                }
                break;
              case KEY_flyingSquares:
                if (index.from === morningShift) {
                  paintShiftBusy('m-flying-squares', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-flying-squares', evening);
                }
                break;
              case KEY_phaseZero:
                if (index.from === morningShift) {
                  paintShiftBusy('m-phase-zero', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-phase-zero', evening);
                }
                break;
              case KEY_molecule:
                if (index.from === morningShift) {
                  paintShiftBusy('m-molecule', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-molecule', evening);
                }
                break;
              case KEY_darkMode:
                if (index.from === morningShift) {
                  paintShiftBusy('m-dark-mode', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-dark-mode', evening);
                }
                break;
              case KEY_goldenRatio:
                if (index.from === morningShift) {
                  paintShiftBusy('m-golden-ratio', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-golden-ratio', evening);
                }
                break;
              case KEY_purpleHaze:
                if (index.from === morningShift) {
                  paintShiftBusy('m-purple-haze', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-purple-haze', evening);
                }
                break;
              case KEY_valhallaLounge:
                if (index.from === morningShift) {
                  paintShiftBusy('m-valhalla-lounge', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-valhalla-lounge', evening);
                }
                break;
              case KEY_zebra:
                if (index.from === morningShift) {
                  paintShiftBusy('m-zebra', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-zebra', evening);
                }
                break;
              case KEY_blackPearl:
                if (index.from === morningShift) {
                  paintShiftBusy('m-black-pearl', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-black-pearl', evening);
                }
                break;
              case KEY_serenity:
                if (index.from === morningShift) {
                  paintShiftBusy('m-serenity', morning);
                }
                if (index.from === eveningShift) {
                  paintShiftBusy('e-serenity', evening);
                }
                break;
            }
          });
        } else {
          //console.log(data.message + " - ft " + fromTime + " tt " + toTime);
        }
      } else {
        // console.log("Api error (not in tor4you)");
      }
    };
    request.send();
  };

  GetData(toDay_YYYYMMDD, Tomorrow_YYYYMMDD);

  function paintShiftBusy(id, morningOrEvening) {
    const studioId = document.getElementById(id);
    if (studioId) {
      studioId.style.transition = 'all 0.5s';
      studioId.classList.add(morningOrEvening + 'busy');
    }
  }

  function paintShiftFree(morningId, eveningId) {
    const morningDiv = document.getElementById(morningId);
    const eveningDiv = document.getElementById(eveningId);

    //check if not null (could be filterd) paint indicators in blue
    if (morningDiv) {
      $(morningDiv).removeClass('m-busy');
    }
    if (eveningDiv) {
      $(eveningDiv).removeClass('e-busy');
    }
  }

  function GetCurrentTimeYYYYMMDDHH(today) {
    const year = today.getFullYear();
    let month = today.getMonth() + 1;

    if (month < 10) {
      month = '0' + month;
    }

    let day = today.getDate();

    if (day < 10) {
      day = '0' + day;
    }

    let hour = today.getHours();

    if (hour < 10) {
      hour = '0' + hour;
    }

    let minute = today.getMinutes();

    if (minute < 10) {
      minute = '0' + minute;
    }

    const currentTime = year + '' + month + '' + day + '' + hour + '' + minute;

    return currentTime;
  }

  function GetCurrentTimeYYYYMMDD(today) {
    const year = today.getFullYear();
    let month = today.getMonth() + 1;

    if (month < 10) {
      month = '0' + month;
    }

    let day = today.getDate();

    if (day < 10) {
      day = '0' + day;
    }

    let hour = today.getHours();

    if (hour < 10) {
      hour = '0' + hour;
    }

    const currentTime = year + '' + month + '' + day;

    return currentTime;
  }

  function GetTomorrowTimeYYYYMMDD(today) {
    //check if last day of the month
    const d = new Date(today);
    //if (d == 0) { console.log("last day of the month") }

    const year = today.getFullYear();

    if (isLastDayOfTheMonth(today)) {
      month = today.getMonth() + 2;

      if (month < 10) {
        month = '0' + month;
      }
      day = today.getDate();
      day = '01';

      return year.toString() + month.toString() + day.toString();
    }
    var month = today.getMonth() + 1;

    if (month < 10) {
      month = '0' + month;
    }

    var day = today.getDate() + 1;

    if (day < 10) {
      day = '0' + day;
    }

    let hour = today.getHours();

    if (hour < 10) {
      hour = '0' + hour;
    }

    const currentTime = year + '' + month + '' + day;

    return currentTime;
  }
  /**
   * Secure Hash Algorithm (SHA256)
   * http://www.webtoolkit.info/
   * Original code by Angel Marin, Paul Johnston
   **/
  function SHA256(s) {
    const chrsz = 8;
    const hexcase = 0;

    function safe_add(x, y) {
      const lsw = (x & 0xffff) + (y & 0xffff);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xffff);
    }

    function S(X, n) {
      return (X >>> n) | (X << (32 - n));
    }
    function R(X, n) {
      return X >>> n;
    }
    function Ch(x, y, z) {
      return (x & y) ^ (~x & z);
    }
    function Maj(x, y, z) {
      return (x & y) ^ (x & z) ^ (y & z);
    }
    function Sigma0256(x) {
      return S(x, 2) ^ S(x, 13) ^ S(x, 22);
    }
    function Sigma1256(x) {
      return S(x, 6) ^ S(x, 11) ^ S(x, 25);
    }
    function Gamma0256(x) {
      return S(x, 7) ^ S(x, 18) ^ R(x, 3);
    }
    function Gamma1256(x) {
      return S(x, 17) ^ S(x, 19) ^ R(x, 10);
    }

    function core_sha256(m, l) {
      const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4,
        0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe,
        0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f,
        0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
        0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
        0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116,
        0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
        0xc67178f2,
      ];
      const HASH = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab,
        0x5be0cd19,
      ];
      const W = new Array(64);
      var a, b, c, d, e, f, g, h, i, j;
      let T1, T2;

      m[l >> 5] |= 0x80 << (24 - (l % 32));
      m[(((l + 64) >> 9) << 4) + 15] = l;

      for (var i = 0; i < m.length; i += 16) {
        a = HASH[0];
        b = HASH[1];
        c = HASH[2];
        d = HASH[3];
        e = HASH[4];
        f = HASH[5];
        g = HASH[6];
        h = HASH[7];

        for (var j = 0; j < 64; j++) {
          if (j < 16) W[j] = m[j + i];
          else
            W[j] = safe_add(
              safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])),
              W[j - 16]
            );

          T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
          T2 = safe_add(Sigma0256(a), Maj(a, b, c));

          h = g;
          g = f;
          f = e;
          e = safe_add(d, T1);
          d = c;
          c = b;
          b = a;
          a = safe_add(T1, T2);
        }

        HASH[0] = safe_add(a, HASH[0]);
        HASH[1] = safe_add(b, HASH[1]);
        HASH[2] = safe_add(c, HASH[2]);
        HASH[3] = safe_add(d, HASH[3]);
        HASH[4] = safe_add(e, HASH[4]);
        HASH[5] = safe_add(f, HASH[5]);
        HASH[6] = safe_add(g, HASH[6]);
        HASH[7] = safe_add(h, HASH[7]);
      }
      return HASH;
    }

    function str2binb(str) {
      const bin = [];
      const mask = (1 << chrsz) - 1;
      for (let i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - (i % 32));
      }
      return bin;
    }

    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, '\n');
      let utftext = '';

      for (let n = 0; n < string.length; n++) {
        const c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }

      return utftext;
    }

    function binb2hex(binarray) {
      const hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
      let str = '';
      for (let i = 0; i < binarray.length * 4; i++) {
        str +=
          hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
          hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf);
      }
      return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  }

  ////////////////////

  //calander setup
  // Get the element's
  const cal = document.getElementById('my-calendar');
  const shift = document.getElementById('shift-select');
  let currentCalanderDate = new Date();
  // Create the calendar
  const myCalendar = jsCalendar.new(cal);

  // Create selected time var
  let selectedTime;

  let calanderDate = new Date();
  const today = new Date();
  myCalendar.min(getTodayDate(today));

  myCalendar.onDateRender(function (date, element, info) {
    if (info.isCurrent) {
      element.style.backgroundColor = '#E84142';
    }

    if (
      date.getDate() >= '1' &&
      date.getDate() < today.getDate() &&
      date.getMonth() == today.getMonth()
    ) {
      element.classList.add('jsCalendar-previous-current-month');
    }
  });
  // Refresh layout
  myCalendar.refresh();

  myCalendar.onDateClick(function (event, date) {
    currentCalanderDate = date;
    //set date to current day

    myCalendar.set(SetGetCurrentTimeFromCalendar(date));
    setDayOnText(date, $('#dd-date-text'));
    $('#date-icon').addClass('pressed');
    calanderDate = date;
    //document.getElementById("dd-date-text").innerHTML = SetGetCurrentTimeFromCalendar(date);
    GetDataFromCalander(GetCurrentTimeFromCalendar(date), GetTomorrowFromCalendar(date));
  });

  setTodayDate();

  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('.collection-list-content').on('mouseenter click', function () {
      $(this).find('.gla').removeClass('hide');
      $(this).find('.gra').removeClass('hide');
    });

    $('.collection-list-content').on('mouseleave', function () {
      $(this).find('.gla').addClass('hide');
      $(this).find('.gra').addClass('hide');
    });
  }

  // dropDown text from CB
  $('.seach-checkbox-field').on('click', function () {
    const cityDdText = document.getElementById('city-dd-text');
    const checkboxes = document.querySelectorAll(
      'input[name="city-search-checkbox-field"]:checked'
    );
    $('#city-icon').addClass('pressed');
    const output = [];
    checkboxes.forEach((checkbox) => {
      output.push(`${checkbox.nextSibling.textContent} `);
    });
    cityDdText.innerHTML = output;
    if (cityDdText.innerHTML == '') {
      $('#city-icon').removeClass('pressed');
      cityDdText.innerHTML = 'עיר';
    }
  });

  $('.seach-checkbox-field').on('click', function () {
    const cityDdText = document.getElementById('price-dd-text');
    const checkboxes = document.querySelectorAll(
      'input[name="price-search-checkbox-field"]:checked'
    );
    $('#money-icon').addClass('pressed');
    const output = [];
    checkboxes.forEach((checkbox) => {
      output.push(`${checkbox.nextSibling.textContent} `);
    });
    cityDdText.innerHTML = output;
    if (cityDdText.innerHTML == '') {
      $('#money-icon').removeClass('pressed');
      cityDdText.innerHTML = 'מחיר';
    }
  });

  $('.seach-checkbox-field').on('click', function () {
    const cityDdText = document.getElementById('type-dd-text');
    const checkboxes = document.querySelectorAll(
      'input[name="type-search-checkbox-field"]:checked'
    );
    $('#type-icon').addClass('pressed');
    const output = [];
    checkboxes.forEach((checkbox) => {
      output.push(`${checkbox.nextSibling.textContent} `);
    });
    cityDdText.innerHTML = output;
    if (cityDdText.innerHTML == '') {
      $('#type-icon').removeClass('pressed');
      cityDdText.innerHTML = 'סוג אולפן';
    }
  });

  // reset button set todays date on calendar
  $('.fs-reset-3').on('click', function () {
    const today = new Date();
    myCalendar.set(getTodayDate(today));
    setTodayDate();
    document.getElementById('dd-date-text').innerHTML = 'תאריך';
    $('#date-icon').removeClass('pressed');
    GetDataFromCalander(GetCurrentTimeFromCalendar(today), GetTomorrowFromCalendar(today));
  });

  function setDayOnText(date: Date, textToChange) {
    let year;
    let month;
    let day;

    //YYYYMMDD
    year = date.getFullYear();

    month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }

    textToChange.text(day.toString() + '.' + month.toString() + '.' + year.toString());
  }
});
