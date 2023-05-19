import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bowser from 'bowser';

const getItem = (key) => {
  const data = typeof window !== "undefined" ? localStorage.getItem(key) : "";

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItem = (key, value) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
  return localStorage.setItem(key, stringify);
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

var PortalMap = new Map();
PortalMap.set("leetcode", {
  url: "https://leetcode.com/",
  id: "1",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1024px-LeetCode_Logo_black_with_text.svg.png",
});
PortalMap.set("geeksforgeeks", {
  url: "https://www.geeksforgeeks.org",
  id: "2",
  logo: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200817185016/gfg_complete_logo_2x-min.png",
});
PortalMap.set("hackerrank", {
  url: "https://www.hackerrank.com/",
  id: "3",
  logo: "https://i0.wp.com/gradsingames.com/wp-content/uploads/2016/05/856771_668224053197841_1943699009_o.png",
});
PortalMap.set("codechef", {
  url: "https://www.codechef.com/",
  id: "4",
  logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png",
});
PortalMap.set("topcoder", {
  url: "https://www.topcoder.com/",
  id: "5",
  logo: "https://www.topcoder.com/wp-content/uploads/2016/01/topcoder-logo.png",
});
PortalMap.set("codeforces", {
  url: "https://www.codeforces.com/",
  id: "6",
  logo: "https://images.squarespace-cdn.com/content/v1/5a076df2268b966170809a2c/1511918009339-YOT20YA31EFYH71J55TQ/ke17ZwdGBToddI8pDm48kHuMSja0Vh8eB_h0MuaD_CRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwU8GNIaN2hBf1MRW24-pMWEs13LPVLeLgTsuCQQ6fIlIDXqTXNEBriE4Y9rQ8vzr4/codeforces_logo.png",
});

var ReversePortalMap = new Map();
ReversePortalMap.set("1", {
  name: "LeetCode",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1024px-LeetCode_Logo_black_with_text.svg.png",
});
ReversePortalMap.set("2", {
  name: "Geeks for Geeks",
  logo: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200817185016/gfg_complete_logo_2x-min.png",
});
ReversePortalMap.set("3", {
  name: "HackerRank",
  logo: "https://i0.wp.com/gradsingames.com/wp-content/uploads/2016/05/856771_668224053197841_1943699009_o.png",
});
ReversePortalMap.set("4", {
  name: "CodeChef",
  logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png",
});
ReversePortalMap.set("5", {
  name: "TopCoder",
  logo: "https://www.topcoder.com/wp-content/uploads/2016/01/topcoder-logo.png",
});
ReversePortalMap.set("6", {
  name: "CodeForces",
  logo: "https://images.squarespace-cdn.com/content/v1/5a076df2268b966170809a2c/1511918009339-YOT20YA31EFYH71J55TQ/ke17ZwdGBToddI8pDm48kHuMSja0Vh8eB_h0MuaD_CRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwU8GNIaN2hBf1MRW24-pMWEs13LPVLeLgTsuCQQ6fIlIDXqTXNEBriE4Y9rQ8vzr4/codeforces_logo.png",
});

const SuccessToast = (text) => {
  toast.success(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const ErrorToast = (text) => {
  toast.error(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const WarningToast = (text) => {
  toast.warning(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Graduation year
const graduationYears = [
  { id: "0", gradYear: 2010 },
  { id: "1", gradYear: 2011 },
  { id: "2", gradYear: 2012 },
  { id: "3", gradYear: 2013 },
  { id: "4", gradYear: 2014 },
  { id: "5", gradYear: 2015 },
  { id: "6", gradYear: 2016 },
  { id: "7", gradYear: 2017 },
  { id: "8", gradYear: 2018 },
  { id: "9", gradYear: 2019 },
  { id: "10", gradYear: 2020 },
  { id: "11", gradYear: 2021 },
  { id: "12", gradYear: 2022 },
  { id: "13", gradYear: 2023 },
  { id: "14", gradYear: 2024 },
  { id: "15", gradYear: 2025 },
  { id: "16", gradYear: 2026 },
  { id: "17", gradYear: 2027 },
  { id: "18", gradYear: 2028 },
  { id: "19", gradYear: 2029 },
  { id: "20", gradYear: 2030 },
];

// Work Experience
const workExperiences = [
  {id: "1", experience: "Internship/Training"},
  {id: "2", experience: "Fulltime"},
  {id: "3", experience: "Other"},
];

let isDesktopDevice = true;

if(typeof window !== undefined){
    const browser = bowser.getParser(window.navigator.userAgent);
    const platform = browser.parsedResult.platform.type;

    isDesktopDevice = (platform === 'desktop');
    if(!platform && window.navigator.userAgent.indexOf('CrOS') !== -1){
        isDesktopDevice = true;
    }
}

const isDesktop = () => isDesktopDevice;
const isMobile = () => !isDesktopDevice;

export {
  getItem,
  setItem,
  removeItem,
  PortalMap,
  ReversePortalMap,
  SuccessToast,
  ErrorToast,
  WarningToast,
  graduationYears,
  workExperiences,
  isDesktop,
  isMobile
};
