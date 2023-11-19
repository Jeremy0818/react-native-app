import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Accounts from "./home/account/Accounts";
import Welcome from "./home/welcome/Welcome";
import Nearbyjobs from "./home/nearby/Nearbyjobs";
import Popularjobs from "./home/popular/Popularjobs";

// job details screen
import Company from "./jobdetails/company/Company";
import { default as JobTabs } from "./jobdetails/tabs/Tabs";
import { default as JobAbout } from "./jobdetails/about/About";
import { default as JobFooter } from "./jobdetails/footer/Footer";
import Specifics from "./jobdetails/specifics/Specifics";

// account details screen
import { default as AccountTabs } from "./accountdetails/tabs/Tabs";
import { default as Transaction } from "./accountdetails/transaction/Transaction";
import { default as AccountFooter } from "./accountdetails/footer/Footer";

// common
import NearbyJobCard from "./common/cards/nearby/NearbyJobCard";
import TransactionCard from "./common/cards/transaction/TransactionCard";
import BottomTabs from "./common/bottomtabs/BottomTabs";
import SlidingMenu from "./common/slidingmenu/SlidingMenu";

export {
  Accounts,
  AccountTabs,
  Transaction,
  TransactionCard,
  AccountFooter,
  ScreenHeaderBtn,
  Welcome,
  Nearbyjobs,
  Popularjobs,
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics,
  NearbyJobCard,
  BottomTabs,
  SlidingMenu
};
