export const createdAtLog = (times) => {
    let newTime = new Date(times);
    let seconds = Math.floor((new Date() - newTime) / 1000);
    let interval = seconds / 31536000;
    if (interval > 2) {return Math.floor(interval) + " years ago";}
    if (interval > 1) {
      return Math.floor(interval) + " year ago";
    }
    interval = seconds / 2592000;
    if (interval > 2) {return Math.floor(interval) + " months ago";}
    if (interval > 1) {
   
      return Math.floor(interval) + " month ago";
    }
    interval = seconds / 86400;
    if (interval > 2) {return Math.floor(interval) + " days ago";}
    if (interval > 1) {
      return Math.floor(interval) + " day ago";
    }
    interval = seconds / 3600;
    if (interval > 2) {return Math.floor(interval) + " hours ago";}
    if (interval > 1) {
      return Math.floor(interval) + " hour ago";
    }
    interval = seconds / 60;
      if (interval > 2) {return Math.floor(interval) + " minutes ago";}
    if (interval > 1) {
      return Math.floor(interval) + " minute ago";
    }
    return "A few seconds ago";
  };

  export const simplifiedTime = (times) => {
    let newTime = new Date(times);
    let seconds = Math.floor((new Date() - newTime) / 1000);
    let interval = seconds / 31536000;
    if (interval > 2) {return Math.floor(interval) + "y";}
    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 2) {return Math.floor(interval) + "mo";}
    if (interval > 1) {
   
      return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400;
    if (interval > 2) {return Math.floor(interval) + "d";}
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 2) {return Math.floor(interval) + "h";}
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
      if (interval > 2) {return Math.floor(interval) + "m";}
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return "Now";
  };

  export const memberSinceLog = (times) => {
    let monthHash = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    const date = new Date(times).toLocaleDateString();
    let month = "";
    let array = [...date]
    // console.log(array)
    
    if(array.length === 9) {
      month += monthHash[array[0]]
    } else if (array.length === 10) {
      month += monthHash[array[0] + array[1]]
    }
    if (month === "January" || month === "February" || month === "March" || month === "April" || month === "May" || month === "June" || month === "July" || month === "August" || month === "September") {
        array[1] = "";
        array[0] = month
    }
    if (array[2] !== "/") {
      array[4] = "";
       return `${array[0]}, ${array[2]}${array[3]} ${array[5]}${array[6]}${array[7]}${array[8]}`
    } else if (month === "October" || month === 'November' || month === 'December') {
       return `${month} ${array[3]}${array[4]}, ${array[6]}${array[7]}${array[8]}${array[9]}`
    }
  };

  export const regularDate = (times) => {
    let monthHash = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    const date = new Date(times).toLocaleDateString();
    let month = "";
    let array = [...date]
    // Jan - Sep
    if(array[1] === "/") {
      month += monthHash[array[0]]
    } else if (array[2] === "/") {
      month += monthHash[array[0] + array[1]]
    }
    if (month === "January" || month === "February" || month === "March" || month === "April" || month === "May" || month === "June" || month === "July" || month === "August" || month === "September") {
      //Single Digit Numbers for DAY
        if(array[3] === "/") {
          return `${month} ${array[2]}, ${array[4]}${array[5]}${array[6]}${array[7]}`
        } 
        // Double Digit Numbers for DAY
        else if (array[4] === "/") {
          return `${month} ${array[2]}${array[3]}, ${array[5]}${array[6]}${array[7]}${array[8]}`
        }
    } else if (month === "October" || month === 'November' || month === 'December') {
      //Single Digit Numbers for DAY
      if(array[4] === "/") {
        return `${month} ${array[3]}, ${array[5]}${array[6]}${array[7]}${array[8]}`
      } 
      // Double Digit Numbers for DAY
      else if (array[5] === "/") {
        return `${month} ${array[3]}${array[4]}, ${array[6]}${array[7]}${array[8]}${array[9]}`
      }
    }
  };