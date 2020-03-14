$(function(){
 const $yomi = $('#yomi');
 const $mondai = $('#mondai');
 const $finishPanel = $('#finish-panel');
 const $countSelect = $('#conut-select');
 const $correctMessage = $('#correct-message');
 const $mistakeMessage = $('#mistake-message');
 const $timeMessage = $('#time-message');
 const $startMessage = $('start-message');
 
 let char_index = 1;
 let max_length = 3;
 let question_number = 1;
 let question_limit = 3;
 let done_questions = {};
 let typing_cnt = 0;
 let correct_cnt = 0;
 let mistake_cnt = 0;
 let start_game = false;
 let start_time = 0;
 
 const MONDAI_LIST =[
  {yomi:'陸上競技',text:'rikuzyoukyougi'},
  {yomi:'体操競技',text:'taisoukyougi'},
  {yomi:'新体操',text:'sintaisou'},
  {yomi:'トランポリン',text:'toranporin'},
  {yomi:'競泳', text:'kyouei'},
  {yomi:'飛び込み', text:'tobikomi'},
  {yomi:'アーティスティックスイミング', text:'a-thisuthikkusuimingu'},
  {yomi:'水球', text:'suikyuu'},
  {yomi:'マラソンスイミング', text:'marasonsuimingu'},
  {yomi:'バドミントン', text:'badominton'},
  {yomi:'野球', text:'yakyuu'},
  {yomi:'ソフトボール', text:'sohutobo-ru'},
  {yomi:'バスケットボール', text:'basukettobo-ru'},
  {yomi:'サッカー', text:'sakka-'},
  {yomi:'ゴルフ', text:'goruh'},
  {yomi:'ハンドボール', text:'handobo-ru'},
  {yomi:'ホッケー', text:'hokke-'},
  {yomi:'ラグビー', text:'ragubi-'},
  {yomi:'卓球', text:'takkyuu'},
  {yomi:'テニス', text:'tenisu'},
  {yomi:'ビーチバレーボール', text:'bi-ti bare-bo-ru'},
  {yomi:'バレーボール', text:'bare-bo-ru'},
  {yomi:'ボクシング', text:'bokusingu'},
  {yomi:'フェンシング', text:'fensingu'},
   {yomi:'柔道', text:'zyuudou'},
   {yomi:'空手', text:'karate'},
   {yomi:'テコンドー', text:'tekondo-'},
   {yomi:'レスリング', text:'resuringu'},
   {yomi:'アーチェリー', text:'a-cheri-'},
   {yomi:'カヌー', text:'kanu-'},
   {yomi:'自転車', text:'zitensya'},
   {yomi:'馬術', text:'bazyutu'},
   {yomi:'近代五種', text:'kindaigosyu'},
   {yomi:'ボート', text:'bo-to'},
  {yomi:'セーリング', text:'se-ringu'},
   {yomi:'射撃', text:'syageki'},
  {yomi:'スケートボード', text:'suke-tobo-do'},
  {yomi:'スポーツクライミング', text:'supo-tu kuraimingu'},
  {yomi:'サーフィン', text:'sa-fin'},
  {yomi:'トライアスロン', text:'toraiasuron'},
  {yomi:'ウエイトリフティング', text:'ueito rihuthingu'},
 ];
 
 $yomi.hide();
 $mondai.hide();
 changeQuestionWord(getQuestionNumber());
 
 $countSelect.on('change',function(e){
  question_limit = Number($countSelect.val());
  done_questions = {};
  changeQuestionWord(getQuestionNumber());
 });
 
 $('#start-button').on('click', function(e) {
     init();
  });
 
 
 $(document).on('keypress',function(e){
  //alert('key:'+e.key);
   if (!start_game && e.keyCode === 32) {
     $startMessage.hide();
     $countSelect.hide();
     $yomi.show();
     $mondai.show();
     start_game = true;
     start_time = performance.now();
     return;
  } else if (!start_game) {
     return;
   }
  typing_cnt++;
  const $target = $('#char-'+char_index);
  const char = $target.text();
  if(e.key===char){
   $target.removeClass('default');
   $target.addClass('correct');
   //alert('正解！！！！');
   char_index++;
   correct_cnt++;
  }else{
   mistake_cnt++;
  }
  
 if (max_length < char_index) {
     question_number++;
     if (question_limit < question_number) {
        finish();
        return;
     }
   changeQuestionWord(getQuestionNumber());
   char_index=1;
  }
 });
 
 function getQuestionNumber(){
  let random_number = Math.floor(Math.random()*10);
  while(done_questions[random_number] !== undefined){
   random_number = Math.floor(Math.random()*10);
  }
  done_questions[random_number] = random_number;
  return random_number;
 }
 
 function init() { //初期化
    char_index = 1;
    question_number = 1;
    question_limit = 3;
    done_questions = {};
    typing_cnt = 0;
    correct_cnt = 0;
    mistake_cnt = 0;
    start_game = false;
    start_time = 0;
    $countSelect.val('3');
    
    changeQuestionWord(getQuestionNumber());
    
    $finishPanel.addClass('hidden');
    $yomi.hide();
    $mondai.hide();
    
  }
 
 function finish() {
     $finishPanel.removeClass('hidden');
     $yomi.hide();
     $mondai.hide();
     $correctMessage.text('正解数:'+correct_cnt+'/'+typing_cnt+'('+Math.floor(correct_cnt/typing_cnt*100)+'%)');
     $mistakeMessage.text('ミス数:'+mistake_cnt+'/'+typing_cnt+'('+Math.floor(mistake_cnt/typing_cnt*100)+'%)'); 
    const end_time = performance.now();
    const typing_time = ((end_time-start_time)/1000).toFixed(2);
    $timeMessage.text('かかった時間:'+typing_time+'秒');
  }  
    
 
 
 function changeQuestionWord(index){
  const word = MONDAI_LIST[index]['text'];
  max_length=word.length;
  let newHtml = '';
  for(var i = 0; i<max_length; i++){
   newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>'
  }
  $mondai.html(newHtml);
  $yomi.text(MONDAI_LIST[index]['yomi']);
  $startMessage.show();
  $countSelect.show();
 }
 

});
