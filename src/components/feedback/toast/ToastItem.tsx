import { TToast } from "@types";
import styles from "./styles.module.css";
import { useAppDispatch } from "@store/hooks";
import { removeToast, stopDisplayAppearance } from "@store/toasts/toastsSlice";
import { useCallback, useEffect, useState } from "react";

const { toastItem } = styles;

const ToastItem = ({ id, message, type, title, displayAppearance }: TToast) => {
  const dispatch = useAppDispatch();
  const progressBarScale = 100;
  const progressBarDuration = 4000;
  const intervalTime = progressBarDuration / progressBarScale;

  const [progressBarIndicator, setProgressBarIndicator] = useState(0);
  const [pauseProgressBarIndicator, setPauseProgressBarIndicator] = useState(false);

  const pauseProgressBarIndicatorHandler = () => {
    setPauseProgressBarIndicator((prev) => !prev);
  };

  const closeToastHandler = useCallback(() => {
    dispatch(removeToast(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (displayAppearance) return;
    const interval = setInterval(() => {
      if (pauseProgressBarIndicator) return;
      setProgressBarIndicator((prev) => {
        if (prev >= progressBarScale) {
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [intervalTime, displayAppearance, pauseProgressBarIndicator]);
  useEffect(() => {
    if (progressBarIndicator !== 100) return;
    closeToastHandler();
  }, [progressBarIndicator, closeToastHandler]);
  // displayAppearance handler
  useEffect(() => {
    if (displayAppearance) {
      const timer = setTimeout(() => {
        dispatch(stopDisplayAppearance(id));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [displayAppearance, dispatch, id]);

  if (displayAppearance) {
    return;
  }
  return (
    <div
      className={`alert alert-${type} ${toastItem}`}
      onMouseEnter={pauseProgressBarIndicatorHandler}
      onMouseLeave={pauseProgressBarIndicatorHandler}
    >
      <h5>{title ? title : type} </h5>
      <p>{message}</p>
      <button className="btn-close" onClick={closeToastHandler}></button>
      <span
        className="placeholder"
        style={{ width: `${progressBarIndicator}%`, transition: `width ${intervalTime}ms liner` }}
      ></span>
    </div>
  );
};

export default ToastItem;
