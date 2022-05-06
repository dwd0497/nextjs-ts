import React, { useEffect } from 'react';
import styles from './Up.module.scss';
import ArrowIcon from "./arrow.svg";
import { useScrollY } from "../../hooks/useScrollY";
import { motion , useAnimation} from "framer-motion";


export const Up = () => {
  const y = useScrollY();

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: y / (document.body.scrollHeight - document.body.clientHeight)})
  },[y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.button animate={controls} initial={{opacity: 0}} className={styles.up} onClick={scrollToTop}>
      <ArrowIcon/>
    </motion.button>
  );
};
