String.prototype.transliterate =
  String.prototype.transliterate ||
  function () {
    let Chars = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "y",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "shch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "YO",
        Ж: "ZH",
        З: "Z",
        И: "y",
        Й: "Y",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "H",
        Ц: "C",
        Ч: "CH",
        Ш: "SH",
        Щ: "SHCH",
        Ъ: "",
        Ы: "Y",
        Ь: "",
        Э: "E",
        Ю: "YU",
        Я: "YA",
        І: "I",
        і: "i",
        Ї: "YI",
        ї: "yi",
        Є: "YE",
        є: "ye",
      },
      t = this;
    for (var i in Chars) {
      t = t.replace(new RegExp(i, "g"), Chars[i]);
    }
    return t;
  };

String.prototype.dateConvert =
  String.prototype.dateConvert ||
  function () {
    const tempDate = new Date(this);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${months[tempDate.getMonth()]}, ${tempDate.getDate()}`;
  };

String.prototype.timeConvert =
  String.prototype.timeConvert ||
  function () {
    const [time, modifier] = this.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

String.prototype.hourConvert =
  String.prototype.hourConvert ||
  function () {
    const date = new Date(this);

    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return `${hours}:${minutes}`;
  };

String.prototype.to12HConvert =
  String.prototype.to12HConvert ||
  function () {
    let [hours, minutes] = this.split(":");

    let modifier = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return hours + ":" + minutes + " " + modifier;
  };
