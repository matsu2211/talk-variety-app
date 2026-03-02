import React, { useState } from 'react';
import { Quiz, MoshimoTopic, ThemeTopic, ProfileTopic } from './types';
import Header from './components/Header';
import CopyButton from './components/CopyButton';
import TopicSelectorModal from './components/TopicSelectorModal';
import { parseRuby, stripRuby } from './utils';

const quizList: Quiz[] = [
  { theme: "究極《きゅうきょく》の食事《しょくじ》対決《たいけつ》", optionA: "一生《いっしょう》カレーしか食《た》べられない", optionB: "一生《いっしょう》ラーメンしか食《た》べられない" },
  { theme: "一生《いっしょう》のおやつ禁止令《きんしれい》", optionA: "一生《いっしょう》チョコ禁止《きんし》", optionB: "一生《いっしょう》ポテト禁止《きんし》" },
  { theme: "甘《あま》いご褒美《ほうび》", optionA: "アイスを毎日《まいにち》食《た》べられる", optionB: "ケーキを週《しゅう》に1回《かい》食《た》べられる" },
  { theme: "毎日《まいにち》の試練《しれん》", optionA: "納豆《なっとう》毎日《まいにち》", optionB: "セロリ毎日《まいにち》" },
  { theme: "食事《しょくじ》のバランス", optionA: "おかずがなくてごはんだけ", optionB: "ごはんがなくておかずだけ" },
  { theme: "理想《りそう》の生活《せいかつ》リズム", optionA: "朝《あさ》5時《じ》起《お》き生活《せいかつ》", optionB: "夜《よる》12時《じ》すぎまで寝《ね》られない生活《せいかつ》" },
  { theme: "一日《いちにち》だけの超能力《ちょうのうりょく》", optionA: "1日《にち》だけ透明《とうめい》人間《にんげん》", optionB: "1日《にち》だけ空《そら》を飛《と》べる" },
  { theme: "一回《いっかい》きりの魔法《まほう》", optionA: "魔法《まほう》が1回《かい》だけ使《つか》える", optionB: "未来《みらい》を1分《ぷん》だけ見《み》られる" },
  { theme: "新《あら》たな身体《しんたい》能力《のうりょく》", optionA: "空《そら》が飛《と》べるようになる", optionB: "水《みず》の中《なか》で呼吸《こきゅう》できるようになる" },
  { theme: "毎日《まいにち》のファッション", optionA: "毎日《まいにち》同《おな》じ服《ふく》で過《す》ごす", optionB: "毎日《まいにち》違《ちが》う靴《くつ》を履《は》く" },
  { theme: "夢《ゆめ》のひみつ道具《どうぐ》", optionA: "どこでもドアを手《て》に入《い》れる", optionB: "タイムマシンを手《て》に入《い》れる" },
  { theme: "ふしぎな能力《のうりょく》", optionA: "自分《じぶん》だけ動物《どうぶつ》と話《はな》せるようになる", optionB: "自分《じぶん》だけ植物《ほうぶつ》と話《はな》せるようになる" },
  { theme: "お金《かね》の選択《せんたく》", optionA: "100万円《まんえん》もらえる", optionB: "10年後《ねんご》に1000万円《まんえん》もらえる" },
  { theme: "変身《へんしん》願望《がんぼう》", optionA: "一日《いちにち》だけ透明《とうめい》人間《にんげん》になる", optionB: "一日《いちにち》だけ誰《だれ》にでも変身《へんしん》できる" },
  { theme: "最高《さいこう》の1週間《しゅうかん》", optionA: "一週間《いっしゅうかん》ゲームし放題《ほうだい》", optionB: "一週間《いっしゅうかん》スイーツ食《た》べ放題《ほうだい》" },
  { theme: "夢《ゆめ》の友達《ともだち》", optionA: "自分《じぶん》のペットがしゃべれるようになる", optionB: "アニメのキャラが家《いえ》に来《く》る" },
  { theme: "虫《むし》対策《たいさく》", optionA: "一生《いっしょう》虫《むし》が寄《よ》ってこないが、自然《しぜん》の香《かおり》を感《かん》じられなくなる", optionB: "虫《むし》に刺《さ》されてもかゆくないが、跡《あと》が1週間《いっしゅうかん》はっきり残《のこ》る" },
  { theme: "我慢《がまん》大会《たいかい》", optionA: "1か月《げつ》スマホ禁止《きんし》", optionB: "1か月《げつ》甘《あま》いもの禁止《きんし》" },
  { theme: "分身《ぶんしん》 or スピード", optionA: "自分《じぶん》のクローンが1人《ひとり》できる", optionB: "自分《じぶん》が2倍速《ばいそく》で動《うご》ける" },
  { theme: "芸術《げいじゅつ》の才能《さいのう》", optionA: "何《なん》でも絵《え》がうまく描《か》けるようになる", optionB: "何《なん》でも楽器《がっき》が演奏《えんそう》できるようになる" },
  { theme: "魔法《まほう》の家具《かぐ》", optionA: "好《す》きな食《た》べ物《もの》が毎日《まいにち》出《で》てくる冷蔵庫《れいぞうこ》", optionB: "世界中《せかいじゅう》の本《ほん》が読《よ》める本棚《ほんだな》" },
  { theme: "天候《てんこう》操作《そうさ》", optionA: "雨《あめ》は降《ふ》らないが、気温《きおん》は35℃以上《いじょう》になる", optionB: "毎日《まいにち》雪《ゆき》が降《ふ》るが、寒《さむ》さを感《かん》じない体《からだ》になる" },
  { theme: "夢《ゆめ》の1日《にち》", optionA: "一日《いちにち》だけ世界《せかい》最大《さいだい》級《きゅう》のテーマパークを貸《か》し切《き》りで遊《あそ》べる", optionB: "一日《いちにち》だけ完全《かんぜん》な無人島《むじんとう》を自由《じゆう》に探検《たんけん》できる" },
  { theme: "有名《ゆうめい》になるなら", optionA: "テレビに出《で》る", optionB: "YouTuberになる" },
  { theme: "物語《ものがたり》の世界《せかい》へ", optionA: "ゲームの世界《せかい》に入《はい》って冒険《ぼうけん》する", optionB: "絵本《えほん》の中《なか》に入《はい》して探検《たんけん》する" },
  { theme: "毎日《まいにち》の絶景《ぜっけい》", optionA: "毎日《まいにち》花火《はなび》が見《み》られる", optionB: "毎日《まいにち》流《なが》れ星《ぼし》が見《み》られる" },
  { theme: "最強《さいきょう》の体《からだ》", optionA: "絶対《ぜったい》に風邪《かぜ》をひかない体《からだ》", optionB: "絶対《ぜったい》にケガをしない体《からだ》" },
  { theme: "ふしぎな家《いえ》", optionA: "冷蔵庫《れいぞうこ》の中《なか》が魔法《まほう》の世界《せかい》", optionB: "クローゼットの中《なか》が異世界《いせかい》につながってる" },
  { theme: "冒険《ぼうけん》の舞台《ぶたい》", optionA: "世界《せかい》で一番《いちばん》高《たか》い山《やま》に登《のぼ》る", optionB: "世界《せかい》で一番《いちばん》深《ふか》い海《うみ》に潜《もぐ》る" },
  { theme: "時間《じかん》の流《なが》れ", optionA: "自分《じぶん》だけ1日《にち》48時間《じかん》になるが、老化《ろうか》がはやく進《すす》む", optionB: "1年《ねん》が半年《はんとし》感覚《かんかく》で過《す》ぎるが、老化《ろうか》は遅《おそ》くなる" },
  { theme: "時空《じくう》トラベル", optionA: "未来《みらい》の自分《じぶん》と会《あ》える", optionB: "過去《かこ》の自分《じぶん》と話《はな》せる" },
  { theme: "グローバルな才能《さいのう》", optionA: "世界中《せかいじゅう》の言語《げんご》が話《はな》せるようになる", optionB: "世界中《せかいじゅう》の料理《りょうり》が作《つく》れるようになる" },
  { theme: "過酷《かこく》な旅《たび》", optionA: "砂漠《さばく》に1週間《しゅうかん》行《い》く", optionB: "南極《なんきょく》に1週間《しゅうかん》行《い》く" },
  { theme: "次元《じげん》を超《こ》える", optionA: "好《す》きなキャラが現実《げんじつ》に現《あらわ》れる", optionB: "自分《じぶん》がアニメの世界《せかい》に入《はい》る" },
  { theme: "超人《ちょうじん》的な移動《いどう》", optionA: "雲《くも》の上《うえ》を歩《ある》けるようになる", optionB: "水《みず》の上《うえ》を走《はし》れるようになる" },
  { theme: "空《そら》飛《と》ぶ道具《どうぐ》", optionA: "魔法《まほう》のホウキで空《そら》を飛《と》ぶ", optionB: "魔法《まほう》のじゅうたんで旅《たび》する" },
  { theme: "最高《さいこう》の相棒《あいぼう》", optionA: "ロボットの友《とも》だちができる", optionB: "モンスターのペットが飼《か》える" },
  { theme: "究極《きゅうきょく》のアイテム", optionA: "世界中《せかいじゅう》どこでも行《い》ける地図《ちず》を手《て》に入《い》れる", optionB: "世界中《せかいじゅう》のことがわかる図鑑《ずかん》を手《て》に入《い》れる" },
  { theme: "声《こえ》の才能《さいのう》", optionA: "自分《じぶん》の声《こえ》が歌手《かしゅ》みたいに美《うつく》しくなる", optionB: "自分《じぶん》の話《はなし》がすごく面白《おもしろ》くなる" },
  { theme: "毎日《まいにち》のイベント", optionA: "毎日《まいにち》どこかで誕生日《たんじょうび》パーティーが開《ひら》かれる", optionB: "毎日《まいにち》どこかで花火《はなび》が上《あ》がる" },
  { theme: "未知《みち》との遭遇《そうぐう》", optionA: "おばけと話《はな》せるようになる", optionB: "宇宙人《うちゅうじん》と話《はな》せるようになる" },
  { theme: "記憶力《きおくりょく》", optionA: "見《み》たものを全部《ぜんぶ》記憶《きおく》できる目《め》", optionB: "聞《き》いたことを全部《ぜんぶ》覚《おぼ》えられる耳《み耳》" },
  { theme: "ゲームのスタイル", optionA: "徹底《てってい》的《てき》にやり込《こ》む派《は》", optionB: "クリアしたらすぐ終了《しゅうりょう》する派《は》" },
  { theme: "映画《えいが》の見《み》方《かた》", optionA: "事前《じぜん》にしっかり調《しら》べる派《は》", optionB: "予備《よび》知識《ちしき》なしで楽《たの》しむ派《は》" },
  { theme: "音楽《おんがく》の聴《き》き方《かた》", optionA: "好《す》きな曲《きょく》をリピートする派《は》", optionB: "いろいろな曲《きょく》をシャッフルする派《は》" },
  { theme: "寝《ね》る前《まえ》の習慣《しゅうかん》", optionA: "ベッドに入《はい》ったら即《そく》寝《ね》る派《は》", optionB: "寝《ね》る前《まえ》に何《なに》かしら見《み》る派《は》" },
  { theme: "新《あたら》しい物《もの》の扱《あつか》い", optionA: "手《て》に人《い》れたらすぐ使《つか》う派《は》", optionB: "もったいなくてしばらく温存《おんぞん》する派《は》" },
  { theme: "予定《よてい》の立《た》て方《かた》", optionA: "細《こま》かく計画《けいかく》を決《き》める派《は》", optionB: "その場《ば》のノリで動《うご》く派《は》" },
  { theme: "買《か》い物《もの》の決断《けつだん》", optionA: "これ！と決《き》めたら即決《そっけつ》派《は》", optionB: "いいなと思《おも》ってもめちゃくちゃ悩《なや》む派《は》" },
  { theme: "わからない時《とき》は", optionA: "すぐスマホなどで検索《けんさく》する", optionB: "まず自分《じぶん》でじっくり考《かんが》える" },
  { theme: "人生《じんせい》の選択《せんたく》", optionA: "失敗《しっぱい》しなさそうな安全《あんぜん》な道《みち》", optionB: "成功《せいこう》したら大《おお》きい挑戦《ちょうせん》の道《みち》" },
  { theme: "行動《こうどう》の基準《きじゅん》", optionA: "準備《じゅんび》を万全《ばんぜん》にしてから動《うご》く", optionB: "まずやってみてから考《かんが》える" },
];

const moshimoTopicList: MoshimoTopic[] = [
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも魔法《まほう》が1つだけ使《つか》えたら、どんな魔法《まほう》がいい？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも空《そら》を自由《じゆう》に飛《と》べたら、どこへ行《い》く？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも透明《とうめい》人間《にんげん》になれたら、何《なに》をしてみたい？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも異世界《いせかい》に行《い》けたら、どんな世界《せかい》に行《い》きたい？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも1日《にち》だけドラゴンに乗《の》れるなら、どこを旅《たび》する？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも影《かげ》と話《はな》せたら、どんなことを聞《き》いてみたい？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも未来《みらい》からロボットが来《き》てくれたら、何《なに》をお願《ねが》いする？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも鏡《かがみ》の中《なか》の世界《せかい》に入《はい》れたら、何《なに》があると思《おも》う？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも夜空《よぞら》に浮《う》かぶ星《ほし》を1つだけ取《と》れるとしたら、どう使《つか》う？" },
  { theme: "ファンタジー・不思議《ふしぎ》系《けい》", title: "もしも魔法《まほう》のじゅうたんで出《で》かけられたら、どこに行《い》く？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしも動物《どうぶつ》と話《はな》せたら、最初《さいしょ》に話《はな》すのはどの動物《どうぶつ》？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしもペットに何《なん》でもできる生《い》き物《もの》を飼《か》えるなら、何《なに》を選《えら》ぶ？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしも自分《じぶん》が1日《にち》だけ好《す》きな動物《どうぶつ》になれるなら、どれになる？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしも海《うみ》の中《なか》で暮《く》らすことになったら、どんな魚《さかな》と友《とも》だちなりたい？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしも恐竜《きょうりゅう》と友《とも》だちになれるなら、どの恐竜《きょうりゅう》？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしも鳥《とり》のように羽《はね》が生《は》えたら、何色《なにいろ》にしたい？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしも動物《どうぶつ》たちが町《まち》で暮《く》らすようになったら、どんな仕事《しごと》をしてそう？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしもペンギンと2人《ふたり》きりで旅行《りょこう》に行《い》くなら、どこに行《い》く？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしもカメと100年《ねん》生《い》きることになったら、どんな話《はなし》をする？" },
  { theme: "動物《どうぶつ》・生《い》きもの系《けい》", title: "もしも雪男《ゆきおとこ》に出会《であ》ったら、どうする？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしもどこでもドアが使《つか》えたら、まずどこに行《い》く？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも一度《いちど》聞《き》いたことを全部《ぜんぶ》覚《おぼ》えられるようになったら？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも毎日《まいにち》ちがう超能力《ちょうのうりょく》が使《つか》えたら、どんな1週間《しゅうかん》になる？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも背《せ》が10メートルになったら、何《なに》をする？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも1日《にち》だけ時間《じかん》を止《と》められたら、何《なに》をしたい？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも身体《からだ》がスライムみたいに変身《へんしん》できるようになったら？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも地面《じめん》の中《なか》を自由《じゆう》に掘《ほ》って進《すす》めたら、どこまで行《い》く？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしもジャンプで雲《くも》まで届《とど》いたら、何《なに》が見《み》える？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも月《つき》まで歩《ある》いて行《い》ける道《みち》があったら、どんな旅《たび》になる？" },
  { theme: "能力《のうりょく》・身体《しんたい》変化《へんか》系《けい》", title: "もしも風《かぜ》になれるとしたら、どんなところを飛《と》びたい？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも世界《せかい》一周《いっしゅう》できるとしたら、どの国《くに》から回《まわ》りたい？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも砂漠《さばく》で暮《く》らすことになったら、何《なに》がいちばん大変《たいへん》？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも山《やま》に住《す》む動物《どうぶつ》になったら、どんな1日《にち》を過《す》ごす？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも自分《じぶん》の好《す》きな季節《きせつ》だけで1年《ねん》ができていたら？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしもジャングルの奥《おく》で不思議《ふしぎ》な村《むら》を見《み》つけたら？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも巨大《きょだい》な木《き》の中《なか》で暮《く》らすことになったら、どんな部屋《へや》にする？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも海《うみ》の底《そこ》に町《まち》があったら、どんな町《まち》？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも雲《くも》の上《うえ》にテーマパークがあったら、何《なに》がある？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも火山《かざん》の中《なか》に迷《まよ》いこんだら、どうやって出《で》る？" },
  { theme: "自然《しぜん》・場所《ばしょ》・旅《たび》系《けい》", title: "もしも北極《ほっきょく》で1週間《しゅうかん》キャンプするなら、何《なに》を持《も》っていく？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしもなんでも食《た》べても太《ふと》らなくなったら、何《なに》を食《た》べたい？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしも1日《にち》だけスイーツだけで暮《く》らすとしたら、何《なに》を選《えら》ぶ？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしも冷蔵庫《れいぞうこ》の中《なか》が迷路《めいろ》になっていたら？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしもお風呂《ふろ》が温泉《おんせん》になったら、どんな名前《なまえ》をつける？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしもおうちが動物《どうぶつ》の形《かたち》だったら、どんな動物《どうぶつ》？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしも一生《いっしょう》1種類《しゅるい》の料理《りょうり》しか食《た》べられなかったら、何《なに》を選《えら》ぶ？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしもカーテンがしゃべりはじめたら、何《なに》を言《い》ってくる？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしも朝《あさ》ごはんをロボットが作《つく》ってくれるなら、何《なに》をお願《ねが》いする？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしも1日《にち》だけお金《かね》が無限《むげん》に使《つか》えたら、何《なに》を買《か》う？" },
  { theme: "食《た》べもの・生活《せいかつ》・日常《にちじょう》系《けい》", title: "もしも夜《よる》だけ動《うご》き出《だ》す家具《かぐ》があったら、何《なに》をしてると思《おも》う？" },
];

const themeTopicList: ThemeTopic[] = [
  { title: "最近《さいきん》、一番《いちばん》笑《わら》ったことは何《なに》？" },
  { title: "もし100万円《まんえん》もらったら、どう使《つか》う？" },
  { title: "好《す》きな食《た》べ物《もの》について熱《あつ》く語《かた》って！" },
  { title: "週末《しゅうまつ》は何《なに》をして過《す》ごすことが多《おお》い？" },
  { title: "最近《さいきん》ハマっていることや、マイブームは？" },
  { title: "子供《こども》の頃《ころ》、どんな遊《あそ》びが好《す》きだった？" },
  { title: "行《い》ってみたい旅行《りょこう》先《さき》はどこ？その理由《りゆう》は？" },
  { title: "今《いま》までで一番《いちばん》うれしかったプレゼントは？" },
  { title: "好《す》きな季節《きせつ》とその理由《りゆう》を教《おし》えて！" },
  { title: "もし一日《いちにち》だけ誰《だれ》かになれるとしたら、誰《だれ》になりたい？" },
  { title: "あなたの「座右《ざゆう》の銘《めい》」や大切《たいせつ》にしている言葉《ことば》は？" },
  { title: "最近《さいきん》見《み》た映画《えいが》や本《ほん》で、心《こころ》に残《のこ》っているものは？" },
  { title: "自分《じぶん》の直《なお》したい「ついついやってしまう癖《くせ》」はある？" },
  { title: "尊敬《そんけい》している人《ひと》は誰《だれ》？どんなところが素敵《すてき》？" },
  { title: "もし明日《あした》世界《せかい》が終《お》わるとしたら、最後《さいご》に何《なに》を食《た》べる？" },
  { title: "得意《とくい》な料理《りょうり》、または作《つく》ってみたい料理《りょうり》は何《なに》？" },
  { title: "今《いま》までで一番《いちばん》「冒険《ぼうけん》したな！」と思《おも》う出来事《できごと》は？" },
  { title: "タイムトラベルできるなら、過去《かこ》と未来《みらい》どっちに行《い》きたい？" },
  { title: "自分《じぶん》の性格《せいかく》を一言《ひとこと》で表《あらわ》すと何《なに》？" },
  { title: "あなたにとっての「一生《いっしょう》の宝物《たからもの》」を教《おし》えて！" },
  { title: "ストレスが溜《た》まったとき、どうやって解消《かいしょう》している？" },
  { title: "理想《りそう》の休日《きゅうじつ》は、どんなスケジュールで過《す》ごしたい？" },
  { title: "歴史《れきし》上《じょう》の人物《じんぶつ》に一人《ひとり》会《あ》えるなら誰《だれ》に会《あ》いたい？" },
  { title: "人生《じんせい》で一番《いちばん》驚《おどろ》いたニュースや出来事《できごと》は何《なに》？" },
  { title: "無人島《むじんとう》に一《ひと》つだけ持《も》っていけるなら何《なに》を選《えら》ぶ？" },
  { title: "自分《じぶん》の「ここがチャームポイント！」と思《おも》うところは？" },
  { title: "もし魔法《まほう》が使《つか》えるなら、最初《さいしょ》に何《なに》をしたい？" },
  { title: "一番《いちばん》好《す》きな動物《どうぶつ》とその理由《りゆう》を聞《き》かせて！" },
  { title: "最近《さいきん》買《か》った物《もの》の中《なか》で、一番《いちばん》「買《か》ってよかった！」と思《おも》うものは？" },
  { title: "自分《じぶん》だけの「秘密《ひみつ》の基地《きち》」を作《つく》るなら、どんな場所《ばしょ》に作《つく》りたい？" },
  { title: "時間《じかん》を忘《わす》れて何《なに》かに没頭《ぼっとう》したことはある？" },
  { title: "これだけは誰《だれ》にも譲《ゆず》れない「こだわり」を教《おし》えて！" },
  { title: "好《す》きな色《いろ》は何《なに》？その色《いろ》にどんなイメージを持《も》ってる？" },
  { title: "小《ちい》さい頃《ころ》の夢《ゆめ》と、今《いま》の夢《ゆめ》を教《おし》えて！" },
  { title: "苦手《にがて》なことを克服《こくふく》するために工夫《くふう》していることは？" },
  { title: "今《いま》まで見《み》た景色《けしき》の中《なか》で、一番《いちばん》感動《かんどう》した風景《ふうけい》は？" },
  { title: "毎日《まいにち》欠《か》かさず行《おこな》っている「ルーティン」はある？" },
  { title: "あなたが一番《いちばん》「幸《しあわ》せだな〜」と感《かん》じる瞬間《しゅんかん》は？" },
  { title: "好《す》きな音楽《おんがく》のジャンルや、おすすめの曲《きょく》は何《なに》？" },
  { title: "もし新《あたら》しく何《なに》か習《なら》い事《ごと》を始《はじ》めるなら何《なに》がいい？" },
  { title: "自分《じぶん》の地元《じもと》や住《す》んでいる街《まち》のおすすめスポットは？" },
  { title: "睡眠《すいみん》の質《しつ》を上《あ》げるために気《き》をつけていることは？" },
  { title: "一度《いちど》じっくり話《はな》してみたい有名《ゆうめい》人《じん》は誰《だれ》？" },
  { title: "もし宇宙《うちゅう》に行《い》けたら、一番《いちばん》に何《なに》を確《たしか》めたい？" },
  { title: "自分《じぶん》を動物《どうぶつ》に例《たと》えると何《なに》？その理由《りゆう》は？" },
  { title: "最近《さいきん》悩《なや》んでいることや、誰《だれ》かに相談《そうだん》したいことはある？" },
  { title: "「この人《ひと》には感謝《かんしゃ》している」というエピソードを教《おし》えて！" },
  { title: "何《なに》かコレクションしているものや、集《あつ》めたいものはある？" },
  { title: "寒《さむ》い冬《ふゆ》に一番《いちばん》食《た》べたくなるものは何《なに》？" },
  { title: "人生《じんせい》において一番《いちばん》大切《たいせつ》にしている価値《かち》観《かん》は何《なに》？" },
];

const profileTopicList: ProfileTopic[] = [
    { title: "好《す》きなのはどっち？", options: ["🍎 フルーツ派《は》", "🍫 スイーツ派《は》", "自由《じゆう》に答《こた》える"] },
    { title: "飲《の》みたいのは？", options: ["🧃ジュース", "☕お茶《ちゃ》", "🥛牛乳《ぎゅうにゅう》", "自由《じゆう》に答《こた》える"] },
    { title: "食《た》べたいのは？", options: ["🍣すし", "🍜ラーメン", "🍛カレー", "自由《じゆう》に答《こた》える"] },
    { title: "好《す》きな色《いろ》は？", options: ["💙青《あお》系《けい》", "💚緑《みどり》系《けい》", "❤️赤《あか》系《けい》", "自由《じゆう》に答《こた》える"] },
    { title: "動物《どうぶつ》を飼《か》うなら？", options: ["🐶いぬ", "🐱ねこ", "🐰うさぎ", "自由《じゆう》に答《こた》える"] },
    { title: "好《す》きな季節《きせつ》は？", options: ["🌸春《はる》", "☀️夏《なつ》", "🍂秋《あき》", "❄️冬《ふゆ》", "自由《じゆう》に答《こた》える"] },
    { title: "好《す》きな天気《てんき》は？", options: ["☀️はれ", "🌧️あめ", "自由《じゆう》に答《こた》える"] },
    { title: "好《す》きなお菓子《かし》は？", options: ["🍪クッキー", "🍬キャンディー", "🍫チョコ", "自由《じゆう》に答《こた》える"] },
    { title: "好《す》きな遊《あそ》びは？", options: ["🎮ゲーム", "🎨絵《え》をかく", "🏃体《からだ》を動《うご》かす", "自由《じゆう》に答《こた》える"] },
    { title: "朝《あさ》ごはんは？", options: ["🍞パン派《は》", "🍚ごはん派《は》", "自由《じゆう》に答《こた》える"] },
    { title: "部屋《へや》の明《あ》かりは？", options: ["💡明《あか》るめ派《は》", "🌙暗《くら》め派《は》", "自由《じゆう》に答《こた》える"] },
    { title: "一人《ひとり》の時間《じかん》は？", options: ["🎵好《す》き", "🤝だれかといたい", "自由《じゆう》に答《こた》える"] },
    { title: "週末《しゅうまつ》は？", options: ["🏠家《いえ》でゆっくり", "🚗おでかけしたい", "自由《じゆう》に答《こた》える"] },
    { title: "魔法《まほう》が使《つか》えるなら？", options: ["✨空《そら》を飛《と》ぶ", "💫透明《とうめい》になる", "⏰時間《じかん》を止《と》める", "自由《じゆう》に答《こた》える"] },
    { title: "タイムマシンで行《い》くなら？", options: ["⏳過去《かこ》", "🚀未来《みらい》", "自由《じゆう》に答《こた》える"] },
    { title: "動物《どうぶつ》と話《はな》せたら？", options: ["🦁どうぶつ園《えん》に行《い》く", "🐦ペットと話《はな》す", "自由《じゆう》に答《こた》える"] },
    { title: "無人島《むじんとう》に持《も》っていくなら？", options: ["📱スマホ", "🍞食《た》べ物《もの》", "🧸ぬいぐるみ", "自由《じゆう》に答《こた》える"] },
    { title: "スーパーヒーローになるなら？", options: ["🦸助《たす》ける派《は》", "🦹冒険《ぼう険》する派《は》", "自由《じゆう》に答《こた》える"] },
    { title: "世界《せかい》一周《いっしゅう》できるなら？", options: ["✈️海《うみ》のある国《くに》", "🏔山《やま》のある国《くに》", "自由《じゆう》に答《こた》える"] },
    { title: "ロボットがいたら？", options: ["🧹家事《かじ》をしてもらう", "🎮一緒《いっしょ》に遊《あそ》ぶ", "自由《じゆう》に答《こた》える"] },
    { title: "一日《いちにち》だけ動物《どうぶつ》になれるなら？", options: ["🐈ねこ", "🦅とり", "自由《じゆう》に答《こた》える"] },
    { title: "雲《くも》に乗《の》れるなら？どこへ行《い》きたい？", options: ["山《やま》", "海《うみ》", "街《まち》", "自由《じゆう》に答《こた》える"] },
    { title: "1億円《おくえん》もらえたら？", options: ["🎁貯金《ちょきん》する", "🛍使《つか》う", "💝分《わ》ける", "自由《じゆう》に答《こた》える"] },
    { title: "朝《あさ》は？", options: ["🌅スッキリ起《お》きる派《は》", "😴ギリギリ派《は》", "自由《じゆう》に答《こた》える"] },
    { title: "雨《あめ》の日《ひ》は？", options: ["☔家《いえ》でまったり", "🧥外《そと》に出《で》たい", "自由《じゆう》に答《こた》える"] },
    { title: "うれしいときは？", options: ["😊話《はな》したくなる", "😌静《しず》かに感《かん》じたい", "自由《じゆう》に答《こた》える"] },
    { title: "悲《かな》しいときは？", options: ["🗣話《はな》して楽《らく》にする", "🧸一人《ひとり》でゆっくりする", "自由《じゆう》に答《こた》える"] },
    { title: "リラックスできるのは？", options: ["🎶音楽《おんがく》を聞《き》く", "📺テレビや動画《どうが》をみる", "😌ぼーっとする", "自由《じゆう》に答《こた》える"] },
    { title: "嫌《きら》いなことがあっても？", options: ["😡言《い》う派《は》", "🤐がまんする派《は》", "自由《じゆう》に答《こた》える"] },
    { title: "誰《だれ》かにほめられると？", options: ["😳照《て》れる", "😆うれしい！", "自由《じゆう》に答《こた》える"] },
    { title: "びっくりしたときは？", options: ["😱声《こえ》を出《だ》す", "😶固《かた》まる", "自由《じゆう》に答《こた》える"] },
    { title: "緊張《きんちょう》する場面《ばめん》では？", options: ["🧍じっとする", "💬話《はな》してごまかす", "自由《じゆう》に答《こた》える"] },
    { title: "自分《じぶん》に近《ちか》いのは？", options: ["😄明《あか》るいタイプ", "🤫おだやかタイプ", "自由《じゆう》に答《こた》える"] },
    { title: "自分《じぶん》を何《なに》かにたとえると？", options: ["🐢カメ", "🐰ウサギ", "🐱ネコ", "自由《じゆう》に答《こた》える"] },
    { title: "一日《いちにち》だけ別《べつ》の仕事《しごと》をするなら？", options: ["👮警察官《けいさつかん》", "👩‍🍳シェフ", "🧙魔法《まほう》使《つか》い", "自由《じゆう》に答《こた》える"] },
    { title: "おばけが出《で》たら？", options: ["👻逃《に》げる", "🗣話《はな》してみる", "自由《じゆう》に答《こた》える"] },
    { title: "どこでもドアがあったら？", options: ["🏖海《うみ》", "🏰海外《かいがい》", "🏠家《いえ》の近《ちか》く", "自由《じゆう》に答《こた》える"] },
    { title: "好《す》きな場所《ばしょ》は？", options: ["🌳自然《しぜん》の中《なか》", "🏙まちの中《なか》", "自由《じゆう》に答《こた》える"] },
    { title: "宇宙《うちゅう》旅行《りょこう》するなら？", options: ["🌕月《つき》", "🪐火星《かせい》", "自由《じゆう》に答《こた》える"] },
    { title: "スマホアプリを作《つく》れるなら？", options: ["🎮ゲーム", "📷カメラ", "🎶音楽《おんがく》", "自由《じゆう》に答《こた》える"] },
    { title: "もし１日《にち》だけ透明《とうめい》人間《にんげん》になったら？", options: ["👀のぞく", "🧭探検《たんけん》する", "自由《じゆう》に答《こた》える"] },
    { title: "一番《いちばん》なりたいのは？", options: ["🦸ヒーロー", "🧙魔法《まほう》使《つか》い", "🤖ロボット", "自由《じゆう》に答《こた》える"] },
];

const kimochiTopicList: ThemeTopic[] = [
  { title: "朝《あさ》起《お》きたときに「うれしい」と思《おも》うのはどんな日《ひ》？" },
  { title: "最近《さいきん》「ちょっとドキドキした」ことは？" },
  { title: "人《ひと》に言《い》われて「うれしかった言葉《ことば》」は？" },
  { title: "逆《ぎゃく》に「少《すこ》し悲《かな》しかった言葉《ことば》」は？" },
  { title: "家《いえ》で「安心《あんしん》する場所《ばしょ》」ってどこ？" },
  { title: "1日《にち》の中《なか》で「ほっとする時間《じかん》」はいつ？" },
  { title: "今日《きょう》の自分《じぶん》を天気《てんき》でたとえると？" },
  { title: "「やってみたいけど少《すこ》しこわいこと」ってある？" },
  { title: "「あ〜疲《つか》れた！」と思《おも》うのはどんなとき？" },
  { title: "どんなときに「がんばったな」って思《おも》える？" },
  { title: "「これしてると時間《じかん》をわすれちゃう！」ことは？" },
  { title: "「これを見《み》たら元気《げんき》になる！」ってものある？" },
  { title: "好《す》きな音《おと》・におい・色《いろ》は？どんなところが好き？" },
  { title: "好《す》きな季節《きせつ》は？どうして？" },
  { title: "もし1日《にち》自由《じゆう》に使《つか》えるなら何《なに》したい？" },
  { title: "「お気《き》に入《い》りの場所《ばしょ》」ってどこ？" },
  { title: "「こういうとき笑《わら》っちゃう！」ってどんなとき？" },
  { title: "「これができたらうれしい！」と思《おも》うことは？" },
  { title: "「自分《じぶん》の中《なか》でキラッと光《ひか》るところ」はどんなところ？" },
  { title: "どんなときに「言《い》いにくいな」と思《おも》う？" },
  { title: "「わかってもらえない」と思《おも》ったときどうしてる？" },
  { title: "イヤな気持《きも》ちのとき、どうやって落《お》ち着《つ》く？" },
  { title: "「言《い》いすぎちゃった…」と思《おも》うことある？" },
  { title: "「気《き》まずいな」と思《おも》ったとき、どうしたい？" },
  { title: "「苦手《にがて》だな」と感《かん》じる人《ひと》ってどんな人《ひと》？" },
  { title: "その人《ひと》とどうやったらうまく話《はな》せそう？" },
  { title: "「がまんしてるな」と思《おも》うのはどんなとき？" },
  { title: "「自分《じぶん》だけちがうかも」と思《おも》ったことある？" },
  { title: "「本当《ほんとう》はこう言《い》いたかったな」って思《おも》うことある？" },
  { title: "昔《むかし》より「できるようになったこと」は？" },
  { title: "「少《すこ》し大人《おとな》になったな」と思《おも》うときは？" },
  { title: "まちがえたけど「学《まな》べたな」と思《おも》ったことある？" },
  { title: "できなかったことが「楽《たの》しく」なったことある？" },
  { title: "どんなときに「自分《じぶん》をほめたい」と思《おも》う？" },
  { title: "これから「もう少《すこ》しがんばってみたいこと」は？" },
  { title: "1年前《ねんまえ》の自分《じぶん》に言《い》してあげたい言葉《ことば》は？" },
  { title: "これから「変《か》わってみたい」と思《おも》うところある？" },
  { title: "「人《ひと》に助《たす》けてもらってうれしかった」ことは？" },
  { title: "「ありがとう」を伝《つた》えたい人《ひと》は？" },
  { title: "「この人《ひと》といると安心《あんしん》する」と思《おも》うのはどんな人？" },
  { title: "人《ひと》と考《かんが》えがちがったときどうしてる？" },
  { title: "人《ひと》のどんなところを「いいな」と思《おも》う？" },
  { title: "「助《たす》けてほしい」と言《い》いたいときどうしてる？" },
  { title: "「ありがとう」ってどんなときに言《い》いやすい？" },
  { title: "人《ひと》を笑顔《えがお》にしたいとき、どうする？" },
  { title: "「自分《じぶん》の意見《いけん》を言《い》ってよかったな」と思《おも》ったことは？" },
  { title: "「やさしさ」ってどんなことだと思《おも》う？" },
  { title: "「ごめんね」を伝《つた》えるとき、どんな気持《きも》ちになる？" },
  { title: "誰《だれ》かに伝《つた》えたい「一言《ひとこと》メッセージ」はある？" },
];

const yesNoTopicList: ThemeTopic[] = [
  // 1. 食べ物・飲み物
  { title: "アイスクリームが好《す》き？" },
  { title: "チョコレートが好《す》き？" },
  { title: "辛《から》い食《た》べ物《もの》は好《す》き？" },
  { title: "フルーツが好《す》き？" },
  { title: "マックよりモスが好《す》き？" },
  { title: "ラーメンが好《す》き？" },
  { title: "スイーツよりしょっぱいものが好《す》き？" },
  { title: "外食《がいしょく》は好《す》き？" },
  { title: "鍋《なべ》で作《つく》った料理《りょうり》を、鍋《なべ》のまま食《た》べる？" },
  { title: "カレーは混《ま》ぜて食《た》べる？" },
  { title: "ポテトにケチャップをつける？" },
  { title: "ポテトは細《ほそ》い派《は》？" },
  { title: "ポテトはカリカリ派《は》？" },
  { title: "目玉焼《めだまや》きにしょうゆをかける？" },
  { title: "唐揚《からあ》げにレモンはかけてほしい？" },
  { title: "ポップコーンは塩《しお》派《は》？" },
  { title: "ケーキのいちごは最後《さいご》に食《た》べる？" },
  { title: "アイスはカップよりコーン派《は》？" },
  { title: "ハンバーグにチーズはのせたい？" },
  { title: "ラーメンのスープは最後《さいご》まで飲《の》む？" },
  { title: "ホットケーキにはバター必須《ひっす》？" },
  { title: "グミはかためが好《す》き？" },
  { title: "アイスは少《すこ》し溶《と》けてから食《た》べる？" },
  { title: "からいものはけっこう平気《へいき》？" },
  { title: "甘《あま》い飲《の》み物《もの》よりお茶《ちゃ》のほうが好《す》き？" },

  // 2. 趣味・エンタメ・技術
  { title: "ゲームが好《す》き？" },
  { title: "パズルゲームが好《す》き？" },
  { title: "スマホやタブレットはよく使《つか》う？" },
  { title: "YouTubeをよく見《み》る？" },
  { title: "アニメが好《す》き？" },
  { title: "漫画《まんが》が好《す》き？" },
  { title: "音楽《おんがく》を聴《き》くのが好《す》き？" },
  { title: "ダンスが好《す》き？" },
  { title: "カラオケが好《す》き？" },
  { title: "絵《え》を描《か》くのが好《す》き？" },
  { title: "字《じ》を書《か》くのが好《す》き？" },
  { title: "写真《しゃしん》を撮《と》るのが好《す》き？" },
  { title: "SNSを見《み》るのが好《す》き？" },
  { title: "映画館《えいがかん》ではエンドロールまで見《み》る？" },
  { title: "イヤホンは片耳《かたみみ》だけで使《つか》うことがある？" },
  { title: "メモは紙《かみ》よりデジタル派《は》？" },
  { title: "同《おな》じ動画《どうが》を何回《なんかい》も見《み》ることがある？" },

  // 3. 遊び・スポーツ
  { title: "外《そと》で遊《あそ》ぶのが好《す》き？" },
  { title: "公園《こうえん》に行《い》くのが好《す》き？" },
  { title: "室内《しつない》で遊《あそ》ぶほうが好《す》き？" },
  { title: "ボードゲームが好《す》き？" },
  { title: "LEGOやブロックが好《す》き？" },
  { title: "スポーツ観戦《かんせん》が好《す》き？" },
  { title: "走《はし》るのが好《す》き？" },
  { title: "音楽《おんがく》フェスに行《い》ってみたい？" },

  // 4. 日常生活・習慣
  { title: "誕生日《たんじょうび》はワクワクする？" },
  { title: "朝《あさ》ごはんは毎日《まいにち》食《た》べる？" },
  { title: "早起《はやお》きが得意《とくい》？" },
  { title: "夜更《よふ》かしをすることがある？" },
  { title: "朝《あさ》より夜《よる》のほうが元気《ぎんき》？" },
  { title: "シャワーより湯船《ゆぶね》に入《はい》るほうが好《す》き？" },
  { title: "長風呂《ながぶろ》するタイプ？" },
  { title: "ペットを飼《か》っている？" },
  { title: "部屋《へや》を片付《かたづ》けるのが得意《とくい》？" },
  { title: "散歩《さんぽ》が好《す》き？" },
  { title: "スーパーでの買《か》い物《もの》は好《す》き？" },
  { title: "昼寝《ひるね》をすることがある？" },
  { title: "新《あたら》しい服《ふく》を着《き》るのはワクワクする？" },
  { title: "自分《じぶん》の部屋《へや》は居心地《いごこち》がいい？" },
  { title: "ベッドに入《はい》ったらすぐ寝《ね》られる？" },
  { title: "コンビニでつい予定《よてい》外《がい》のものを買《か》ってしまうことがある？" },
  { title: "目覚《めざ》ましは1回《かい》で起《お》きられる？" },
  { title: "スマホをトイレに持《も》っていく？" },
  { title: "新《あたら》しい服《ふく》は洗《あら》わずに着《き》ることがある？" },
  { title: "旅行《りょこう》の荷物《にもつ》は前日《ぜんじつ》に準備《じゅんび》する？" },
  { title: "本《ほん》はカバーを外《はず》して読《よ》む？" },
  { title: "寝《ね》るときに豆電球《まめでんきゅう》をつける？" },
  { title: "同《おな》じ服《ふく》を色違《いろちが》いで持《も》っている？" },
  { title: "アラームをスヌーズ設定《せってい》にしている？" },
  { title: "家《いえ》では裸足《はだし》で過《す》ごす？" },
  { title: "冷蔵庫《れいぞうこ》に賞味《しょうみ》期限《きげん》切《ぎ》れのものが入《はい》っていることがある？" },
  { title: "料理《りょうり》中《ちゅう》に味見《あじみ》を何《なん》度《ど》もする？" },
  { title: "寝《ね》る前《まえ》にスマホを見《み》る？" },
  { title: "寝《ね》る前《まえ》に動画《どうが》を見《み》る？" },
  { title: "寝《ね》るときは真っ暗《まっくら》がいい？" },
  { title: "靴下《くつした》は右《みぎ》からはく？" },

  // 5. 性格・考え方・コミュニケーション
  { title: "新《あたら》しいことに挑戦《ちょうせん》するのは好《す》き？" },
  { title: "ちょっと慎重《しんちょう》なタイプ？" },
  { title: "緊張《きんちょう》しやすいほう？" },
  { title: "マイペースなほう？" },
  { title: "コツコツ続《つづ》けるのが得意《とくい》？" },
  { title: "思《おも》ったことをすぐ言《い》えるほう？" },
  { title: "じっくり考《かんが》えてから話《はな》すタイプ？" },
  { title: "みんなでワイワイするのが好《す》き？" },
  { title: "少人数《しょうにんずう》で過《す》ごすのが好《す》き？" },
  { title: "一人《ひとり》の時間《じかん》も好《す》き？" },
  { title: "人《ひと》の話《はなし》を聞《き》くのが得意《とくい》？" },
  { title: "頼《たよ》られると嬉《うれ》しい？" },
  { title: "相談《そうだん》されると頑張《がんば》りたくなる？" },
  { title: "失敗《しっぱい》してもすぐ切《き》り替《か》えられる？" },
  { title: "完璧《かんぺき》主義《しゅぎ》なところがある？" },
  { title: "初対面《しょたいめん》の人《ひと》は苦手《にがて》？" },
  { title: "直感《ちょっかん》で決《き》めるタイプ？" },
  { title: "計画《けいかく》を立《た》てるのが好《す》き？" },
  { title: "想像《そうぞう》するのが好《す》き？" },
  { title: "とにかく笑《わら》うのが好《す》き？" },
  { title: "人《ひと》を笑《わら》わせるのが好《す》き？" },
  { title: "優先《ゆうせん》したいのは「楽《たの》しさ」だと思《おも》う？" },
  { title: "優先《ゆうせん》したいのは「安心《安心》」だと思《おも》う？" },
  { title: "チームで動《うご》くほうが得意《とくい》？" },
  { title: "一人《ひとり》で進《すす》めるほうがやりやすい？" },
  { title: "人前《ひとまえ》で歌《うた》うのは平気《へいき》？" },
  { title: "電話《でんわ》よりメッセージ派《は》？" },
  { title: "写真《しゃしん》は撮《と》るより撮《と》られるほうが好《す》き？" },
  { title: "注射《ちゅうしゃ》はあまりこわくない？" },
  { title: "好《す》きなものは先《さき》に食《た》べる？" },
  { title: "新品《しんぴん》より少《すこ》し使《つか》いこんだ物《もの》のほうが好《す》き？" },
  { title: "にぎやかな場所《ばしょ》より静《しず》かな場所《ばしょ》が好《す》き？" },

  // 6. 自然・場所・旅行
  { title: "動物《どうぶつ》が好《す》き？" },
  { title: "犬《いぬ》派《は》？" },
  { title: "猫《ねこ》派《は》？" },
  { title: "海《うみ》より山《やま》が好《す》き？" },
  { title: "プールが好《す》き？" },
  { title: "夏《なつ》が好《す》き？" },
  { title: "冬《ふゆ》が好《す》き？" },
  { title: "雨《あめ》の日《ひ》は好《す》き？" },
  { title: "雷《かみなり》はこわい？" },
  { title: "寒《さむ》い方《ほう》が好《す》き？" },
  { title: "暑《あつ》い方《ほう》が好《す》き？" },
  { title: "電車《でんしゃ》に乗《の》るのが好《す》き？" },
  { title: "旅行《りょこう》が好《す》き？" },
  { title: "キャンプに興味《きょうみ》がある？" },
  { title: "花火《はなび》が好《す》き？" },
  { title: "高《たか》いところは苦手《にがて》？" },
  { title: "びっくり系《けい》（ホラーやお化《ば》け屋敷《やしき》）は苦手《にがて》？" },
  { title: "雨《あめ》の日《ひ》はちょっとうれしい？" },
  { title: "動物《どうぶつ》はさわるの平気《へいき》？" },
  { title: "ジェットコースターは好《す》き？" },
  { title: "ホラー映画《えいが》は平気《へいき》？" },
  { title: "買《か》い物《もの》で迷《まよ》ったら、いったん店《みせ》を出《で》て考《かんが》える？" },
  { title: "小銭《こぜに》が増《ふ》えるのがイヤで、なるべく出《だ》そうとする？" },
  { title: "撮《と》った写真《しゃしん》をよく見返《みかえ》す方《ほう》？" },
  { title: "使《つか》わない物《もの》でも「いつか使《つか》うかも」で残《のこ》す？" },
  { title: "部屋《へや》は一気《いっき》にまとめて片付《かたづ》けるタイプ？" },
  { title: "予定《よてい》の時間《じかん》より少《すこ》し早《はや》めに行動《こうどう》する？" },
  { title: "好《す》きなものは最後《さいご》に残《のこ》す？" },
  { title: "外食《がいしょく》では毎回《まいかい》ほぼ同《おな》じメニューを選《えら》ぶ？" },
  { title: "動画《どうが》は倍速《ばいそく》で見《み》ることがある？" }
];


type GameMode = 'menu' | 'quiz' | 'moshimo' | 'theme' | 'profile' | 'kimochi' | 'yesno';
type Selection = 'A' | 'B' | null;

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  // Quiz Game State
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedOption, setSelectedOption] = useState<Selection>(null);

  // Moshimo Talk State
  const [moshimoTopic, setMoshimoTopic] = useState<MoshimoTopic | null>(null);
  
  // Theme Talk State
  const [themeTopic, setThemeTopic] = useState<ThemeTopic | null>(null);

  // Profile Talk State
  const [profileTopic, setProfileTopic] = useState<ProfileTopic | null>(null);
  const [selectedProfileOption, setSelectedProfileOption] = useState<number | null>(null);

  // Kimochi Talk State
  const [kimochiTopic, setKimochiTopic] = useState<ThemeTopic | null>(null);

  // YesNo Talk State
  const [yesnoTopic, setYesnoTopic] = useState<ThemeTopic | null>(null);
  const [selectedYesNoOption, setSelectedYesNoOption] = useState<'YES' | 'NO' | null>(null);

  const resetAllState = () => {
    setQuiz(null);
    setSelectedOption(null);
    setMoshimoTopic(null);
    setThemeTopic(null);
    setProfileTopic(null);
    setSelectedProfileOption(null);
    setKimochiTopic(null);
    setYesnoTopic(null);
    setSelectedYesNoOption(null);
    setIsListModalOpen(false);
  };

  const getRandomItem = <T,>(list: T[]): T => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  };

  const handleModeSelect = (mode: GameMode) => {
    resetAllState();
    setGameMode(mode);
    if (mode === 'quiz') setQuiz(getRandomItem(quizList));
    if (mode === 'moshimo') setMoshimoTopic(getRandomItem(moshimoTopicList));
    if (mode === 'theme') setThemeTopic(getRandomItem(themeTopicList));
    if (mode === 'profile') setProfileTopic(getRandomItem(profileTopicList));
    if (mode === 'kimochi') setKimochiTopic(getRandomItem(kimochiTopicList));
    if (mode === 'yesno') setYesnoTopic(getRandomItem(yesNoTopicList));
  };

  const handleNext = () => {
    resetAllState();
    if (gameMode === 'quiz') setQuiz(getRandomItem(quizList));
    if (gameMode === 'moshimo') setMoshimoTopic(getRandomItem(moshimoTopicList));
    if (gameMode === 'theme') setThemeTopic(getRandomItem(themeTopicList));
    if (gameMode === 'profile') setProfileTopic(getRandomItem(profileTopicList));
    if (gameMode === 'kimochi') setKimochiTopic(getRandomItem(kimochiTopicList));
    if (gameMode === 'yesno') setYesnoTopic(getRandomItem(yesNoTopicList));
  };

  const handleManualSelect = (item: any) => {
    if (gameMode === 'quiz') setQuiz(item);
    if (gameMode === 'moshimo') setMoshimoTopic(item);
    if (gameMode === 'theme') setThemeTopic(item);
    if (gameMode === 'profile') setProfileTopic(item);
    if (gameMode === 'kimochi') setKimochiTopic(item);
    if (gameMode === 'yesno') setYesnoTopic(item);
  };

  const handleBackToMenu = () => {
    resetAllState();
    setGameMode('menu');
  };

  const renderMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
      <button onClick={() => handleModeSelect('quiz')} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-8 border-rose-200 group">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🅰️🅱️</div>
        <h2 className="text-2xl font-bold text-rose-500">{parseRuby("究極《きゅうきょく》の二択《にたく》")}</h2>
        <p className="text-stone-500 mt-2 text-sm">{parseRuby("どっちを選《えら》ぶ？究極《きゅうきょく》の選択《せんたく》！")}</p>
      </button>

      <button onClick={() => handleModeSelect('moshimo')} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-8 border-amber-200 group">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💭</div>
        <h2 className="text-2xl font-bold text-amber-500">もしもトーク</h2>
        <p className="text-stone-500 mt-2 text-sm">もしも〇〇だったらどうする？</p>
      </button>

      <button onClick={() => handleModeSelect('theme')} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-8 border-orange-200 group">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🗣️</div>
        <h2 className="text-2xl font-bold text-orange-500">テーマトーク</h2>
        <p className="text-stone-500 mt-2 text-sm">{parseRuby("お題《だい》について話《はな》そう！")}</p>
      </button>

      <button onClick={() => handleModeSelect('profile')} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-8 border-sky-200 group">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📝</div>
        <h2 className="text-2xl font-bold text-sky-500">{parseRuby("自分《じぶん》だったら？")}</h2>
        <p className="text-stone-500 mt-2 text-sm">{parseRuby("自分《じぶん》ならどうするか答《こた》えよう！")}</p>
      </button>

      <button onClick={() => handleModeSelect('kimochi')} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-8 border-emerald-200 group">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💚</div>
        <h2 className="text-2xl font-bold text-emerald-500">{parseRuby("今《いま》のきもち")}</h2>
        <p className="text-stone-500 mt-2 text-sm">{parseRuby("自分《じぶん》の心《こころ》と向《む》き合《あ》ってみよう")}</p>
      </button>

      <button onClick={() => handleModeSelect('yesno')} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-8 border-violet-200 group">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🙆‍♀️🙅‍♂️</div>
        <h2 className="text-2xl font-bold text-violet-500">YES / NO</h2>
        <p className="text-stone-500 mt-2 text-sm">{parseRuby("直感《ちょっかん》で答《こた》えよう！")}</p>
      </button>
    </div>
  );

  const renderControls = (colorClass: string) => (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <button 
        onClick={handleNext} 
        className={`${colorClass} text-white py-4 px-12 rounded-full font-bold text-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1`}
      >
        {parseRuby("つぎのお題《だい》")}
      </button>
      <button 
        onClick={() => setIsListModalOpen(true)} 
        className="bg-white text-stone-600 py-4 px-10 rounded-full font-bold text-lg hover:bg-stone-50 transition-all shadow border border-stone-200"
      >
        {parseRuby("リストから選《えら》ぶ")}
      </button>
    </div>
  );

  const renderQuiz = () => {
    if (!quiz) return null;
    const combinedQuizText = `${stripRuby(quiz.theme)}\n🅰️ ${stripRuby(quiz.optionA)}\n🅱️ ${stripRuby(quiz.optionB)}`;
    return (
      <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-rose-100 mb-8">
           <h2 className="text-2xl md:text-3xl font-bold text-stone-700 leading-relaxed mb-6">{parseRuby(quiz.theme)}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <button 
               onClick={() => setSelectedOption('A')}
               className={`p-6 rounded-2xl transition-all ${selectedOption === 'A' ? 'bg-rose-500 text-white scale-105 shadow-lg' : 'bg-rose-50 hover:bg-rose-100 text-stone-700'}`}
             >
               <div className="text-3xl mb-2">🅰️</div>
               <div className="font-bold text-lg">{parseRuby(quiz.optionA)}</div>
             </button>
             <button 
               onClick={() => setSelectedOption('B')}
               className={`p-6 rounded-2xl transition-all ${selectedOption === 'B' ? 'bg-rose-500 text-white scale-105 shadow-lg' : 'bg-rose-50 hover:bg-rose-100 text-stone-700'}`}
             >
               <div className="text-3xl mb-2">🅱️</div>
               <div className="font-bold text-lg">{parseRuby(quiz.optionB)}</div>
             </button>
           </div>
           <CopyButton textToCopy={combinedQuizText} />
        </div>
        {renderControls('bg-rose-500')}
        <TopicSelectorModal 
          isOpen={isListModalOpen} 
          onClose={() => setIsListModalOpen(false)}
          title="お題《だい》を選《えら》ぶ"
          items={quizList}
          onSelect={handleManualSelect}
          displayKey="theme"
          colorClass="bg-rose-500"
        />
      </div>
    );
  };

  const renderMoshimo = () => {
    if (!moshimoTopic) return null;
    return (
      <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-amber-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-amber-200"></div>
          <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold mb-6">
            {parseRuby(moshimoTopic.theme)}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-stone-700 leading-relaxed mb-8">
            {parseRuby(moshimoTopic.title)}
          </h2>
          <CopyButton textToCopy={stripRuby(moshimoTopic.title)} />
        </div>
        {renderControls('bg-amber-500')}
        <TopicSelectorModal 
          isOpen={isListModalOpen} 
          onClose={() => setIsListModalOpen(false)}
          title="お題《だい》を選《えら》ぶ"
          items={moshimoTopicList}
          onSelect={handleManualSelect}
          displayKey="title"
          colorClass="bg-amber-500"
        />
      </div>
    );
  };

  const renderTheme = () => {
    if (!themeTopic) return null;
    return (
      <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-orange-100 mb-8 relative">
           <div className="text-6xl text-orange-200 absolute -top-8 -left-4 transform -rotate-12">“</div>
           <div className="text-6xl text-orange-200 absolute -bottom-8 -right-4 transform -rotate-12">”</div>
           <h2 className="text-2xl md:text-4xl font-bold text-stone-700 leading-relaxed py-4 mb-4">
             {parseRuby(themeTopic.title)}
           </h2>
           <CopyButton textToCopy={stripRuby(themeTopic.title)} />
        </div>
        {renderControls('bg-orange-500')}
        <TopicSelectorModal 
          isOpen={isListModalOpen} 
          onClose={() => setIsListModalOpen(false)}
          title="お題《だい》を選《えら》ぶ"
          items={themeTopicList}
          onSelect={handleManualSelect}
          displayKey="title"
          colorClass="bg-orange-500"
        />
      </div>
    );
  };

  const renderProfile = () => {
    if (!profileTopic) return null;
    return (
      <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-sky-100 mb-8">
           <h2 className="text-2xl md:text-4xl font-bold text-stone-700 leading-relaxed mb-8">
             {parseRuby(profileTopic.title)}
           </h2>
           <CopyButton textToCopy={stripRuby(profileTopic.title)} />
           <div className="space-y-3 mt-8">
             {profileTopic.options.map((option, index) => (
               <button
                 key={index}
                 onClick={() => setSelectedProfileOption(index)}
                 className={`w-full p-4 rounded-xl text-lg font-bold transition-all border-2 ${
                   selectedProfileOption === index 
                   ? 'bg-sky-500 text-white border-sky-500 scale-105 shadow-md' 
                   : 'bg-white text-stone-600 border-sky-100 hover:border-sky-300 hover:bg-sky-50'
                 }`}
               >
                 {parseRuby(option)}
               </button>
             ))}
           </div>
        </div>
        {renderControls('bg-sky-500')}
        <TopicSelectorModal 
          isOpen={isListModalOpen} 
          onClose={() => setIsListModalOpen(false)}
          title="お題《だい》を選《えら》ぶ"
          items={profileTopicList}
          onSelect={handleManualSelect}
          displayKey="title"
          colorClass="bg-sky-500"
        />
      </div>
    );
  };

  const renderKimochi = () => {
    if (!kimochiTopic) return null;
    return (
      <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-emerald-100 mb-8 relative">
           <div className="absolute top-4 right-4 text-4xl opacity-20">🌿</div>
           <h2 className="text-2xl md:text-4xl font-bold text-stone-700 leading-relaxed py-4 mb-4">
             {parseRuby(kimochiTopic.title)}
           </h2>
           <CopyButton textToCopy={stripRuby(kimochiTopic.title)} />
        </div>
        {renderControls('bg-emerald-500')}
        <TopicSelectorModal 
          isOpen={isListModalOpen} 
          onClose={() => setIsListModalOpen(false)}
          title="お題《だい》を選《えら》ぶ"
          items={kimochiTopicList}
          onSelect={handleManualSelect}
          displayKey="title"
          colorClass="bg-emerald-500"
        />
      </div>
    );
  };

  const renderYesNo = () => {
    if (!yesnoTopic) return null;
    return (
        <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-violet-100 mb-8">
                <h2 className="text-2xl md:text-4xl font-bold text-stone-700 leading-relaxed mb-8">{parseRuby(yesnoTopic.title)}</h2>
                <CopyButton textToCopy={stripRuby(yesnoTopic.title)} />
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
                <button 
                  onClick={() => setSelectedYesNoOption('YES')}
                  className={`p-8 rounded-2xl text-3xl font-bold transition-all ${selectedYesNoOption === 'YES' ? 'bg-violet-500 text-white scale-105 shadow-lg' : 'bg-white text-violet-500 hover:bg-violet-50'}`}
                >
                  １YES
                </button>
                <button 
                  onClick={() => setSelectedYesNoOption('NO')}
                  className={`p-8 rounded-2xl text-3xl font-bold transition-all ${selectedYesNoOption === 'NO' ? 'bg-rose-500 text-white scale-105 shadow-lg' : 'bg-white text-rose-500 hover:bg-rose-50'}`}
                >
                  ２NO
                </button>
            </div>

             {renderControls('bg-violet-500')}
             <TopicSelectorModal 
              isOpen={isListModalOpen} 
              onClose={() => setIsListModalOpen(false)}
              title="お題《だい》を選《えら》ぶ"
              items={yesNoTopicList}
              onSelect={handleManualSelect}
              displayKey="title"
              colorClass="bg-violet-500"
            />
        </div>
    )
  }

  return (
    <div className="min-h-screen pb-12">
      <Header 
        title={
          gameMode === 'menu' ? 'いろいろトーク' :
          gameMode === 'quiz' ? '究極《きゅうきょく》の二択《にたく》' :
          gameMode === 'moshimo' ? 'もしもトーク' :
          gameMode === 'theme' ? 'テーマトーク' :
          gameMode === 'profile' ? '自分《じぶん》だったら？' :
          gameMode === 'kimochi' ? '今《いま》のきもち' :
          gameMode === 'yesno' ? 'YES / NO' : ''
        }
        mode={gameMode}
      />
      
      <main className="container mx-auto">
        {gameMode === 'menu' && renderMenu()}
        {gameMode === 'quiz' && renderQuiz()}
        {gameMode === 'moshimo' && renderMoshimo()}
        {gameMode === 'theme' && renderTheme()}
        {gameMode === 'profile' && renderProfile()}
        {gameMode === 'kimochi' && renderKimochi()}
        {gameMode === 'yesno' && renderYesNo()}
      </main>

      {gameMode !== 'menu' && (
        <div className="text-center mt-12">
          <button 
            onClick={handleBackToMenu}
            className="text-stone-500 hover:text-stone-800 font-bold underline decoration-2 underline-offset-4 transition-colors"
          >
            {parseRuby("メニューに戻《もど》る")}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;