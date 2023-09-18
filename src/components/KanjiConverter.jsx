import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import dataJson from "../kanji2.json";
import pinyin from "pinyin";
import zhuyin from "zhuyin";

const KanjiConverter = () => {
  const [strJA, setJA] = useState("");
  const [strTW, setTW] = useState("");
  const [strCN, setCN] = useState("");
  const [strPinyin, setPinyin] = useState("");
  const [strZhuyin, setZhuyin] = useState("");

  const countryCode = ["ja", "zh-TW", "zh-CN"];

  const strTranslate = useCallback((type, sourceText) => {
    const table = dataJson;
    let text = sourceText;

    // 各国のコードで置換元と置換対象のマップを作成
    const replacementMap = {};
    countryCode.forEach((code) => {
      if (code === type) return;
      table[code].forEach((source, index) => {
        if (source && table[type][index]) {
          replacementMap[source] = table[type][index];
        }
      });
    });

    // マップを使用して置換
    for (const [source, target] of Object.entries(replacementMap)) {
      text = text.replaceAll(source, target);
    }

    return text;
  }, []);

  const onChangeText = (event) => {
    const inputValue = event.target.value;
    const jaText = strTranslate(countryCode[0], inputValue);
    const twText = strTranslate(countryCode[1], inputValue);
    const cnText = strTranslate(countryCode[2], inputValue);
    const pinyinText = getPinyin(inputValue);
    
    setJA(jaText);
    setTW(twText);
    setCN(cnText);
    setPinyin(pinyinText);
  };

  const getPinyin = (text) => {
    if (text === "") {
      return "";
    }
    const txt = pinyin(text);
    return txt.join(",");
  };

  useEffect(() => {
    const zhuyinText = zhuyin(strPinyin);
    setZhuyin(zhuyinText);
  }, [strPinyin]);


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-multiline-static-ja"
            label="日文"
            multiline
            rows={5}
            value={strJA}
            onChange={onChangeText}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-multiline-static-tw"
            label="繁體中文"
            multiline
            rows={5}
            value={strTW}
            onChange={onChangeText}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-multiline-static-cn"
            label="简体中文"
            multiline
            rows={5}
            value={strCN}
            onChange={onChangeText}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="outlined-multiline-static-pinyin"
            label="拼音"
            multiline
            rows={5}
            value={strPinyin}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="outlined-multiline-static-zhuyin"
            label="注音"
            multiline
            rows={5}
            value={strZhuyin}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default KanjiConverter;
