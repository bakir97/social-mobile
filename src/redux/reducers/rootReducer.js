import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import { reducer as FormReducer } from "redux-form";
import SignUpReducer from "./SignUpReducer";
import ObjaveReducer from "./ObjaveReducer";
import ProfilReducer from "./ProfilReducer";
import ChatReducer from "./ChatReducer";
export default combineReducers({
  Login: LoginReducer,
  form: FormReducer,
  SignUp: SignUpReducer,
  Objave: ObjaveReducer,
  Profil: ProfilReducer,
  Chat: ChatReducer
});
