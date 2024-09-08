import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import ClientIDSignup from './src/views/screens/ClientIDSignup';
import HomeScreen from './src/views/screens/HomeScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import OneOfThreeA from './src/views/screens/OneOfThreeA';
import OneOfThreeB from './src/views/screens/OneOfThreeB';
import Page from './src/views/screens/Page';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import ResetPin from './src/views/screens/ResetPin';
import Signin from './src/views/screens/Signin';
import Splash from './src/views/screens/Splash';
import TermsConditions from './src/views/screens/TermsConditions';
import ThreeOfThree from './src/views/screens/ThreeOfThree';
import TipsAdvice from './src/views/screens/TipsAdvice';
import TwoOfThreeA from './src/views/screens/TwoOfThreeA';
import NewPin from './src/views/screens/NewPin';
import TwoOfThreeB from './src/views/screens/TwoOfThreeB';
import Welcome from './src/views/screens/Welcome';

import Checkmail from './src/views/screens/Checkmail';
import Successfull from './src/views/screens/Successfull';
import MarketSuccessfull from './src/views/screens/MarketSuccessfull';
import FacebookHandler from './src/views/screens/FacebookHandler';
import FirstStep from './src/views/screens/FirstStep';
import FirstTimeWelcome from './src/views/screens/FirstTimeWelcome';
import FirstTimeWelcome2 from './src/views/screens/FirstTimeWelcome2';
import StartPage from './src/views/screens/StartPage';
import Kyc from './src/views/screens/kyc/Kyc';
import NewTransPin from './src/views/screens/kyc/NewTransPin';
import ResetTransPin from './src/views/screens/kyc/ResetTransPin';
import KycDetails from './src/views/screens/kyc/KycDetails';
import KycDoc from './src/views/screens/kyc/KycDoc';
import KycSecurity from './src/views/screens/kyc/KycSecurity';
import ChangePassword from './src/views/screens/kyc/ChangePassword';
import FaqsSupport from './src/views/screens/kyc/FaqsSupport';
import CallUs from './src/views/screens/kyc/CallUs';
import ChatWithUs from './src/views/screens/kyc/ChatWithUs';
import Faqs from './src/views/screens/kyc/Faqs';
import RepayLoans from './src/views/screens/kyc/RepayLoans';
import ReferFriends from './src/views/screens/kyc/ReferFriends';

import CompleteProfile from './src/views/screens/kyc/CompleteProfile';
import PersonalDetails from './src/views/screens/kyc/PersonalDetails';
import ContactDetails from './src/views/screens/kyc/ContactDetails';
import EmploymentDetails from './src/views/screens/kyc/EmploymentDetails';
import DocumentUpload from './src/views/screens/kyc/DocumentUpload';
import KycCompleted from './src/views/screens/kyc/KycCompleted';
import DocUploadB from './src/views/screens/kyc/DocUploadB';
import CopCompleteProfile from './src/views/screens/kyc/CopCompleteProfile';
import CorporationDetails from './src/views/screens/kyc/CorporationDetails';
import CorporationFinancial from './src/views/screens/kyc/CorporationFinancial';
import Directorship from './src/views/screens/kyc/Directorship';
import CopDocumentUpload from './src/views/screens/kyc/CopDocumentUpload';
import CopDocUploadB from './src/views/screens/kyc/CopDocUploadB';
import ViewCopDocs from './src/views/screens/kyc/ViewCopDocs';
import LoanApply from './src/views/screens/loanapplication/LoanApply';
import LoanDetails from './src/views/screens/loanapplication/LoanDetails';
import LoanDetailsB from './src/views/screens/loanapplication/LoanDetailsB';
import LoanSummary from './src/views/screens/loanapplication/LoanSummary';
import Congratulations from './src/views/screens/loanapplication/Congratulations';
import LoanRepay from './src/views/screens/loanrepayment/LoanRepay';
import RepayLoanA from './src/views/screens/loanrepayment/RepayLoanA';
import RepayLoanB from './src/views/screens/loanrepayment/RepayLoanB';
import RepayLoanC from './src/views/screens/loanrepayment/RepayLoanC';
import RepayLoanD from './src/views/screens/loanrepayment/RepayLoanD';
import RepayLoanE from './src/views/screens/loanrepayment/RepayLoanE';
import RepayLoanUsdA from './src/views/screens/loanrepayment/RepayLoanUsdA';
import RepayLoanDcardA from './src/views/screens/loanrepayment/RepayLoanDcardA';
import RepaySummary from './src/views/screens/loanrepayment/RepaySummary';
import PaymentSuccessfull from './src/views/screens/loanrepayment/PaymentSuccessfull';
import FundWallet from './src/views/screens/loanrepayment/FundWallet';
import FundOnWeb from './src/views/screens/loanrepayment/FundOnWeb';
import MyLoans from './src/views/screens/loanrepayment/MyLoans';
import LoanMarket from './src/views/screens/loanmarket/LoanMarket';
import FilteredMarket from './src/views/screens/loanmarket/FilteredMarket';
import SelectedBorrower from './src/views/screens/loanmarket/SelectedBorrower';
import TransectionPin from './src/views/screens/loanmarket/TransectionPin';
import MyTransections from './src/views/screens/loanmarket/MyTransections';
import LoanFundHistory from './src/views/screens/loanmarket/LoanFundHistory';
import WalletFundHistory from './src/views/screens/loanmarket/WalletFundHistory';
import Markers from './src/views/screens/loanmarket/Markers';
import LogBorrowerCorp from './src/views/screens/LogBorrowerCorp';
import LogBorrowerInd from './src/views/screens/LogBorrowerInd';
import LogLenderCorp from './src/views/screens/LogLenderCorp';
import LogLenderInd from './src/views/screens/LogLenderInd';

import Loader from './src/views/components/Loader';

const Stack = createStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('Splash');
  
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     authUser();
  //   }, 2000);
  // }, []);

  // const authUser = async () => {
  //   try {
  //     let userData = await AsyncStorage.getItem('userData');
  //     if (userData) {
  //       userData = JSON.parse(userData);
  //       if (userData.loggedIn) {
  //         setInitialRouteName('HomeScreen');
  //       } else {
  //         setInitialRouteName('LoginScreen');
  //       }
  //     } else {
  //       setInitialRouteName('RegistrationScreen');
  //     }
  //   } catch (error) {
  //     setInitialRouteName('RegistrationScreen');
  //   }
  // };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="ClientIDSignup" component={ClientIDSignup} />
            <Stack.Screen name="OneOfThreeA" component={OneOfThreeA}/>
            <Stack.Screen name="OneOfThreeB" component={OneOfThreeB}/>
            <Stack.Screen name="TwoOfThreeA" component={TwoOfThreeA}/>
            <Stack.Screen name="TwoOfThreeB" component={TwoOfThreeB}/>
            <Stack.Screen name="TermsConditions" component={TermsConditions}/>
            <Stack.Screen name="TipsAdvice" component={TipsAdvice}/>
            <Stack.Screen name="ThreeOfThree" component={ThreeOfThree}/>
            <Stack.Screen name="ResetPin" component={ResetPin}/>
            <Stack.Screen name="Checkmail" component={Checkmail}/>
            <Stack.Screen name="Successfull" component={Successfull}/>
            <Stack.Screen name="FacebookHandler" component={FacebookHandler}/>
            <Stack.Screen name="FirstStep" component={FirstStep}/>
            <Stack.Screen name="FirstTimeWelcome" component={FirstTimeWelcome}/>
            <Stack.Screen name="FirstTimeWelcome2" component={FirstTimeWelcome2}/>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="StartPage" component={StartPage} />
            <Stack.Screen name="Kyc" component={Kyc} />
            <Stack.Screen name="NewTransPin" component={NewTransPin} />
            <Stack.Screen name="ResetTransPin" component={ResetTransPin} />
            <Stack.Screen name="KycDetails" component={KycDetails} />
            <Stack.Screen name="KycDoc" component={KycDoc} />
            <Stack.Screen name="KycSecurity" component={KycSecurity} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="FaqsSupport" component={FaqsSupport} />
            <Stack.Screen name="CallUs" component={CallUs} />
            <Stack.Screen name="ChatWithUs" component={ChatWithUs} />
            <Stack.Screen name="Faqs" component={Faqs} />
            <Stack.Screen name="RepayLoans" component={RepayLoans} />
            <Stack.Screen name="ReferFriends" component={ReferFriends} />
            <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
            <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
            <Stack.Screen name="ContactDetails" component={ContactDetails} />
            <Stack.Screen name="EmploymentDetails" component={EmploymentDetails} />
            <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
            <Stack.Screen name="KycCompleted" component={KycCompleted} />
            <Stack.Screen name="DocUploadB" component={DocUploadB} />
            <Stack.Screen name="ViewCopDocs" component={ViewCopDocs} />
            <Stack.Screen name="CopCompleteProfile" component={CopCompleteProfile} />
            <Stack.Screen name="CorporationDetails" component={CorporationDetails} />
            <Stack.Screen name="CorporationFinancial" component={CorporationFinancial} />
            <Stack.Screen name="Directorship" component={Directorship} />
            <Stack.Screen name="CopDocumentUpload" component={CopDocumentUpload} />
            <Stack.Screen name="CopDocUploadB" component={CopDocUploadB} />
            <Stack.Screen name="LoanApply" component={LoanApply} />
            <Stack.Screen name="LoanDetails" component={LoanDetails} />
            <Stack.Screen name="LoanDetailsB" component={LoanDetailsB} />
            <Stack.Screen name="LoanSummary" component={LoanSummary} />
            <Stack.Screen name="Congratulations" component={Congratulations} />
            <Stack.Screen name="LoanRepay" component={LoanRepay} />
            <Stack.Screen name="MyLoans" component={MyLoans} />
            <Stack.Screen name="RepayLoanA" component={RepayLoanA} />
            <Stack.Screen name="RepayLoanB" component={RepayLoanB} />
            <Stack.Screen name="RepayLoanC" component={RepayLoanC} />
            <Stack.Screen name="RepayLoanD" component={RepayLoanD} />
            <Stack.Screen name="RepayLoanE" component={RepayLoanE} />
            <Stack.Screen name="RepayLoanUsdA" component={RepayLoanUsdA} />
            <Stack.Screen name="RepayLoanDcardA" component={RepayLoanDcardA} />
            <Stack.Screen name="RepaySummary" component={RepaySummary} />
            <Stack.Screen name="PaymentSuccessfull" component={PaymentSuccessfull} />
            <Stack.Screen
              name="RegistrationScreen"

              component={RegistrationScreen}
            />
            <Stack.Screen name="Page" component={Page} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoanMarket" component={LoanMarket} />
            <Stack.Screen name="FilteredMarket" component={FilteredMarket} />
            <Stack.Screen name="SelectedBorrower" component={SelectedBorrower} />
            <Stack.Screen name="TransectionPin" component={TransectionPin} />
            <Stack.Screen name="MarketSuccessfull" component={MarketSuccessfull} />
            <Stack.Screen name="Markers" component={Markers} />
            <Stack.Screen name="FundWallet" component={FundWallet} />
            <Stack.Screen name="FundOnWeb" component={FundOnWeb} />
            <Stack.Screen name="MyTransections" component={MyTransections} />
            <Stack.Screen name="LoanFundHistory" component={LoanFundHistory} />
            <Stack.Screen name="WalletFundHistory" component={WalletFundHistory} />
            <Stack.Screen name="NewPin" component={NewPin} />
            <Stack.Screen name="LogBorrowerInd" component={LogBorrowerInd} />
            <Stack.Screen name="LogBorrowerCorp" component={LogBorrowerCorp} />
            <Stack.Screen name="LogLenderCorp" component={LogLenderCorp} />
            <Stack.Screen name="LogLenderInd" component={LogLenderInd} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
