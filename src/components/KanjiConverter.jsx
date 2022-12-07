import { useState } from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import dataJson from "../kanji.json";

const KanjiConverter = ()=> {
    const [strJA, setJA] = useState('');
    const [strTW, setTW] = useState('');
    const [strCN, setCN] = useState('');    
    
    const countryCode = ["ja", "zh-TW", "zh-CN"];

    // 文字列をまとめて置換するプログラム
    const strTranslate = (type, sourceText) =>{
        const table = dataJson
        let text = sourceText.slice()
        
        // 全文字のループ
        for (let [index, value] of table[type].entries())
        {                        
            countryCode.forEach ((code)=>{
                // 国のコードの置換元と置換対象が一緒の場合スキップ
                if (code === type) return;

                let target = table[code][index]
    
                // 空白の場合はスキップする
                if (target === "") {
                    return;
                }

                // 空白の場合はスキップする
                if (value === ""){
                    return;
                }

                // 文字が同じときスキップする
                if (target === value) {
                    return;
                }

                text = text.replaceAll(target, value)
            })
        }
        return text
    }
    
    const onChangeText = (event) => {               
        setJA(strTranslate(countryCode[0], event.target.value));
        setTW(strTranslate(countryCode[1], event.target.value));
        setCN(strTranslate(countryCode[2], event.target.value));
    };    

    return (
      <div>
        <Grid container direction="column" spacing={4}>
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
        </Grid>

      </div>
    );
  }
  
  export default KanjiConverter;