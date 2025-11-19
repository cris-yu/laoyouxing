Page({
  data: {
    orderId: '',
    travelerId: '',
    messages: [],
    inputText: '',
    recording: false,
    showQuickQuestions: true,
    quickQuestions: [
      '现在要去哪儿？',
      '几点集合？',
      '附近有厕所吗？',
      '今天还有什么安排？',
    ],
    recorderManager: null,
  },

  onLoad(options) {
    const { orderId, travelerName } = options;
    this.setData({
      orderId,
      travelerId: travelerName,
    });
    this.initRecorder();
  },

  initRecorder() {
    const recorderManager = wx.getRecorderManager();
    this.setData({ recorderManager });
  },

  onInput(e) {
    this.setData({
      inputText: e.detail.value,
      showQuickQuestions: false,
    });
  },

  askQuickQuestion(e) {
    const text = e.currentTarget.dataset.text;
    this.setData({
      inputText: text,
      showQuickQuestions: false,
    });
    this.sendMessage();
  },

  sendMessage() {
    const text = this.data.inputText.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      time: this.formatTime(new Date()),
    };

    this.setData({
      messages: [...this.data.messages, userMessage],
      inputText: '',
    });
  },

  startRecord() {
    this.setData({ recording: true });
  },

  stopRecord() {
    if (this.data.recording) {
      this.setData({ recording: false });
    }
  },

  cancelRecord() {
    this.setData({ recording: false });
  },

  formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  },
});