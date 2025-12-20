import api from "../api/axiosDefaults";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshJWTToken,
  sendLogoutRequest,
  setErrorMessage,
  setIsJwtChecked,
} from "../store/actions";

const useCheckJwtIsValid = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checkJwt = async () => {
      try {
        await api.get(`/username`);
      } catch (error) {
        if (error.status === 420) {
          let boo = await dispatch(refreshJWTToken());
          if (!boo) {
            dispatch(sendLogoutRequest(id, null, null));
          }
        } else {
          setErrorMessage(error.status + " " + error.message);
        }
      }
    };
    if (!isChecked) {
      setIsChecked(true);
      checkJwt();
    }
  }, []);
};

export default useCheckJwtIsValid;
