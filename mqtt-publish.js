// MQTT client details:
var message;
let broker = {
    //高高物理部サーバーのmqttサーバーに接続するための設定
    hostname: 'takataka.msep.jp/mqtt/',
    port: 1883
  };
  // MQTT client:
  let client;
  // client credentials:
  let creds = { 
    clientID: 'shitake', // choose whatever name you want
    userName: 'iot', // unique Key from token
    password: 'iot-school' // unique Secret from token
  }
  // topic to subscribe to when you connect:
  let topic2 = "okada_LED";
  let topic3 ="shitake2-voice";
  let topic4 ="shitake2-photo-recieve"
  
  // Paho MQTTクライアントの設定
  // Create an MQTT client:
    client = new Paho.MQTT.Client(broker.hostname,   Number(broker.port), creds.clientID);
  
  // messageを受信したときに呼ばれる関数
    client.onMessageArrived = onMessageArrived;
  
  // MQTTブローカーへの接続
  client.connect({
      onSuccess: onConnect, // callback function for when you connect
      userName: creds.userName, // username
      password: creds.password, // password
      useSSL: true // use SSL
    });
  
  // 接続成功時のコールバック関数
  function onConnect() {
    console.log("Connected to MQTT broker");
    // トピックのサブスクライブ
    //client.subscribe(topic);
    //client.subscribe(topic2);
    //client.subscribe(topic3);
    client.subscribe(topic4);
    
  
  }
  
  // called when a message arrives
  function onMessageArrived(message) { 
    console.log(message.payloadString);
    console.log(message.destinationName);
    const voice_responce =message.payloadString;
    document.getElementById('response').textContent = voice_responce;
    
    //受け取ったメッセージがtopic（photo)なら
    if(message.destinationName==topic4){
      //画像を表示
      displayImage(message.payloadString);
    }
  
  }
  
  /*
  // 写真を撮るための関数
  function takePhoto() {
       // キャンバス要素の取得
        var canvas = document.getElementById("canvas");
  
        // ビデオから画像をキャプチャしてキャンバスに描画
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // キャンバスからデータURLを取得
        var dataUrl = canvas.toDataURL("image/jpeg");
  
        // MQTTメッセージの作成
        var message = new Paho.MQTT.Message(dataUrl);
        message.destinationName = topic;
  
        // MQTTメッセージの送信
        client.send(message);
  
        console.log("Send message");
  
  }
  
  // 
  function onLED() {
  
        // MQTTメッセージの作成
        var message = new Paho.MQTT.Message("a");
        message.destinationName = topic2;
  
        // MQTTメッセージの送信
        client.send(message);
  
        console.log("Send message");
  
  }*/
  function send_voice() {
      const recordedVoice = document.getElementById("result").innerHTML;
      // const recordedVoice = $("#result").text();
      // 入力データのバリデーションを行う
      if (!recordedVoice) {
          alert("Please provide");
          return;
      }
      console.log(recordedVoice);
      message = new Paho.MQTT.Message(recordedVoice);
      message.destinationName = topic3;
  
      // MQTTメッセージの送信
      client.send(message);
  
      console.log("Send message");
  
  }/*
  function displayImage(dataUrl) {
    var canvas = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = dataUrl;
  }*/
  
  