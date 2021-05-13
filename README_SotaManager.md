# Sotaの動作指示コマンド

**基本的には、addActionを使って記述するのがよい。**



## addAction: Actionコマンドを順に実行するキューを貯める  
`[記述形式] addAction + (Split Word) + (Action Command)`




## [Action command]
- **motion**: Motion Command（ボディランゲージ）を実行し、motionの終わりを待つ。  
`[記述形式] motion + (Split Word) + (Motion Command)`  
	- [Motion Command]  
		1. ojigi: おじぎをする  
		2. kasige: くびをランダムに左右どちらかにかしげて、もどす
		3. unazuki: うなずく
		4. mojimoji: もじもじする
		5. wakeUp: 目を覚ます
		6. raiseHand: 左右どちらかの腕をランダムであげて、さげる
		7. kimochi: あまえる
		8. byebye: ランダムで左右どちらかの手をふる
		9. no: 首を横にふる
		10. directHand: 指定した方向の腕で近いものを指さす
		`[記述形式] directHand + (Split Word) + right/left`  
		11. homePose: 初期ポーズに戻る
		12. pose: ８個の間接モータの角度と到達時間を指示する  
		`[記述形式] pose + (Split Word) + (胴体の左右) + (Split Word) + (左肩) + (Split Word) + (左ひじ) + (Split Word) + (右肩) + (Split Word) + (右ひじ) + (Split Word) + (首の左右) + (Split Word) + (首の上下) + (Split Word) + (首の傾げ) + (Split Word) + (到達時間ms)`
			1. [胴体の左右] (右) -1200 ~ 0(初期) ~ 1200 (ロボットからみて左)
			2. [左肩] (上) 900 ~ 100(前) ~ -900(初期) ~ -1400 (後ろ) 
			3. [左ひじ] (後ろ) 650 ~ 0(初期) ~ -900(手前)
			4. [右肩]  (上) -900 ~ -100(前)  ~ 900(初期) ~ 1400 (後ろ)
			5. [右ひじ] (後ろ)-650 ~ 0(初期) ~ 900(手前) 
			6. [首の左右]（右）-1500 ~ 0(初期) ~ 1500（ロボットからみて左）
			7. [首の上下] (上)-270 ~ 0(初期) ~ 50 (下)
			8. [首のかしげ] (右)-250~ 0(初期) ~ 250 (ロボットから見て左)
			9. [到達時間] ミリ秒で記述
		13. neckPose: 首の３個の間接モータの角度と到達時間を指示する  
		`[記述形式] neckPose + (Split Word) + (首の左右) + (Split Word) + (首の上下) + (Split Word) + (首の傾げ) + (Split Word) + (到達時間ms)`
		14. bodyPose: 胴体の５個の間接モータの角度と到達時間を指示する
		`[記述形式] bodyPose + (Split Word) + (胴体の左右) + (Split Word) + (左肩) + (Split Word) + (左ひじ) + (Split Word) + (右肩) + (Split Word) + (右ひじ) + (Split Word) + (到達時間ms)`

- **motionWith**: Motion Command（ボディランゲージ）を実行し、motionの終わりを待たずに次のAction Commandの実行に移る。連続で実行した時は、キュー方式で順にMotion Commandの実行が行われる。  
`[記述形式] motionWith + (Split Word) + (Motion Command)`

- **posture**: Posture Command（目標姿勢）を実行する。目標姿勢への到達を待たずに次のAction Commandの実行に移る。目標姿勢への到達を待たずに、目標姿勢の更新が可能。  
`[記述形式] posture + (Split Word) + (Posture Command)`  
	- [Posture Command]
		1. faceTo: 体と顔を目標地点(x,y,z)に向ける  
		`[記述形式] faceTo + (Split Word) + (x cm) + (Split Word) + (y cm) + (Split Word) + (z cm)`
		2. lookAt: 顔を目標地点(x,y,z)に向ける  
		`[記述形式] lookAt + (Split Word) + (x cm) + (Split Word) + (y cm) + (Split Word) + (z cm)`
		3. homePosture: 姿勢を初期位置に戻す
- **setPostureSpeed**: Posture Commandの実行速度を指定する  
`[記述形式] setPostureSpeed + (Split Word) + (50~100(標準)~300; 大きいほど早い)`

- **idleMotion**: 仕草の実装目的。motionコマンドに近い。

- **emotion**: 情動を変化させる  
`[記述形式] emotion + (Split Word) + (Emotion Command)`  
ex. `emotion:sad=4:angry=+1:happy=-5`
	- [Emotion Command]
		1. sad=[value]: 目が青、話速が減少、話ピッチが減少、動作スピードが減少、呼吸スピードが上昇、呼吸振幅が減少  
		2. angry=[value]: 目が赤、話速が減少、話ピッチが減少、動作スピードが上昇、呼吸スピードが上昇、呼吸振幅が上昇
		3. happy=[value]: 目が緑、話速が上昇、話ピッチが上昇、動作スピードが上昇、呼吸スピードが減少、呼吸振幅が上昇
		4. relax=[value]: 目が黄色、話速が減少、話ピッチが上昇、動作スピードが減少、呼吸スピードが減少、呼吸振幅が減少
		5. reset: すべての感情を0にする  
		[value] = -5~+5 (増減指定), 0~5 (絶対値指定)
	- 運用方式
		- 一度、表出した情報は、60秒ごとに薄まっていきます
		- 残った情動は、後から生起した情動と足し合わされます
		- 何かの感情の値がプラスでコマンドが送られたとき、目の色は変わらず、そこから一番初めのSAYのとき、目の感情が増幅されて表現される
		- それ以外は、コマンド実行時に即時に目の色変化する（今まで通り）
		- 以下のオプションを加えると、プラスでも今まで通り  
		`change=true`

- **say**: テキストを読み上げ（WAVファイルを再生し）、終わるまで待つ。  
`[記述形式] say + (Split Word) + (任意のテキスト)`  
`[記述形式] say + (Split Word) + ([File Path].wav)`  
`[記述形式] sayFiller1 + (Split Word) + (任意のテキスト)`：音声ファイルの準備が遅い時、適宜相槌を挟む。  (種類：sayFiller1, sayFiller2)  
【オプション】：しゃべり方の調整。他のsayも同様。　
	1. rate - 話速　5 ~ 25 標準11  
	2. pitch - 声の高さ　1 ~ 20　標準13  
	3. intonation - 抑揚　1 ~ 15　標準11    
	`[記述形式] say + (Split Word) + (任意のテキスト)+ (Split Word)+ rate=11`  
	`[記述形式] say + (Split Word) + (任意のテキスト)+ (Split Word)+ pitch=1~20+(Split Word)+ intonation=1~15`  
- **sayWith**: テキストを読み上げ（WAVファイルを再生し）、終わるのを待たずに次のAction Commandの実行に移る。連続で実行した時は、キュー方式で順にテキストの読み上げ（WAVファイルの再生）が行われる。  
`[記述形式] sayWith + (Split Word) + (任意のテキスト)`  
`[記述形式] sayWith + (Split Word) + ([File Path].wav)`  
`[記述形式] sayWithFiller + (Split Word) + (任意のテキスト)`：音声ファイルの準備が遅い時、適宜相槌を挟む。
- **prepareSay**: テキストの音声ファイルを用意する。用意完了を待たずに次のAction Commandの実行に移る。  
`[記述形式] prepareSay + (Split Word) + (任意のテキスト)`
- **insertSay**: 音声実行のキューに関係なく、テキストの読み上げ（WAVファイルの再生）を重ねて行う。（主に効果音用）  
`[記述形式] insertSay + (Split Word) + (任意のテキスト)`  
`[記述形式] insertSsay + (Split Word) + ([File Path].wav)`

- **wait**: 指定された時間の間、何もせずに待機する。  
`[記述形式] sayWith + (Split Word) + (任意の時間ms)`

- **eyeColor**: 目の色を指定する。  
`[記述形式] eyeColor + (Split Word) + (Color Command)`
	- [Color Command]
		1. red: 赤
		2. green: 緑
		3. blue: 青
		4. while: 白 
		5. reset: 初期状態に戻す
		6. on: offのとき、初期状態に戻す。
		7. off: 目の光を消す（黒）。on以外のColor Commandを受け付けなくなる。
	- 【オプション】片目だけの光を変える  
	`[記述形式] eyeColor + (Split Word) + [right/left] + (Split Word) + (Color Command)`
	- 【オプション】RGB値を指示する  
	`[記述形式] eyeColor + (Split Word) + R=* + (Split Word) + G=* + (Split Word) + B=*`  
	`[記述形式] eyeColor + (Split Word) + rR=* + (Split Word) + rG=* + (Split Word) + rB=* + (Split Word) + lR=* + (Split Word) + lG=* + (Split Word) + lB=*`  
	`*: RGB値（0～255）`

- **idleMode**: 体動を指定する。  
`[記述形式] idleMode + (Split Word) + (Idle Command)`
	- [Idle Command]
		1. breath: 呼吸しているような微細な体動を行う。
		2. boring: 呼吸に加え、体を時々、動かす
		3. kill: すべての体動をとめる。

- 停止のコマンド類
	1. **clearAction**: キューに溜まっているAction Commandをすべて消去する。
	2. **clearMotion**: Motion Command の実行を途中でやめる。
	3. **clearIdleMotion**: Idle Motion Command の実行を途中でやめる。
	4. **clearPosture**: 目標姿勢への到達を途中でやめる。
	5. **clearVoice**: 音声の再生を途中でやめる。
	6. **clearWait**: 待機を途中でやめる。
	7. **clearBehavior**: clearAction + clearMotion + clearPosture + clearVoice + clearWait


- **alarmTimer**: 指定の秒数後、返事を返す  
`[記述形式] alarmTimer + (Split Word) + (wait time (ms)) + (Split Word) + (response)`
	- 例えば、  
	`alarmTimer:2000:sh;time`　：接続先に２秒後にsh;timeを投げる  
	`alarmTimer:2000--5000:sh;command`　：接続先に２～５秒後にsh;commandを投げる  
	- キャンセルする場合は、  
	`alarmTimer:kill:sh;time`　：一番古い「sh;timeを投げる」タイマーが１つキャンセルされる  
