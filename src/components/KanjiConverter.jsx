import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import dataJson from "../kanji.json";
import pinyin from "pinyin";
import zhuyin from "zhuyin";

const KanjiConverter = ()=> {
    const [strJA, setJA] = useState('');
    const [strTW, setTW] = useState('');
    const [strCN, setCN] = useState('');    
    const [strPinyin, setPinyin] = useState('');    
    const [strZhuyin, setZhuyin] = useState('');    
    
    const countryCode = ["ja", "zh-TW", "zh-CN"];

    // 文字列をまとめて置換するプログラム
    const strTranslate = (type, sourceText) =>{
        const table = dataJson
        let text = sourceText
        
        // 全文字のループ
        for (let [index, value] of table[type].entries())
        {                        
            countryCode.forEach ((code)=>{
                // 国のコードの置換元と置換対象が一緒の場合スキップ
                if (code === type) {
                    return;
                }

                const source = table[code][index]
    
                // 空白の場合はスキップする
                if (source === "" || value === "") {
                    return;
                }

                // 文字が同じときスキップする
                if (source === value) {
                    return;
                }

                text = text.replaceAll(source, value)
            })
        }
        return text
    }
    
    const onChangeText = (event) => {               
        setJA(strTranslate(countryCode[0], event.target.value));
        setTW(strTranslate(countryCode[1], event.target.value));
        setCN(strTranslate(countryCode[2], event.target.value));
        getPinyin(event.target.value);
    };    
    
    const getPinyin = (text) =>{
        if (text === "") {
            setPinyin("");
            return;
        }
        const txt = pinyin(text);
        setPinyin(txt.join(','));        
    }
    
    useEffect(() => {
        getZhuyin(strPinyin);
    }, [strPinyin])

    const getZhuyin = (text) =>{
        if (text === "") {
            setZhuyin("");
            return;
        }
        const txt = zhuyin(text);
        setZhuyin(txt);        
    }

    return (
      <div>
        <Grid container direction="column" spacing={3}>
            <Grid item>
                <TextField
                    id="outlined-multiline-static"
                    label="日文"
                    multiline
                    rows={5}
                    value={strJA}
                    onChange={onChangeText}
                    sx={{ width: '50ch' }}
                />
            </Grid>

            <Grid item>
                <TextField
                    id="outlined-multiline-static"
                    label="繁體中文"
                    multiline
                    rows={5}
                    value={strTW}
                    onChange={onChangeText}
                    sx={{ width: '50ch' }}
                />
            </Grid>

            <Grid item>
                <TextField
                    id="outlined-multiline-static"
                    label="简体中文"
                    multiline
                    rows={5}
                    value={strCN}
                    onChange={onChangeText}
                    sx={{ width: '50ch' }}
                />
            </Grid>
            <Grid item>
                
                <TextField
                    disabled
                    id="outlined-multiline-static"
                    label="拼音"
                    multiline
                    rows={5}
                    value={strPinyin}
                    sx={{ width: '50ch' }}
                />
            </Grid>
            <Grid item>
                
                <TextField
                    disabled
                    id="outlined-multiline-static"
                    label="注音"
                    multiline
                    rows={5}
                    value={strZhuyin}
                    sx={{ width: '50ch' }}
                />
            </Grid>
        </Grid>

      </div>
    );
  }
  
  export default KanjiConverter;