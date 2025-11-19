import { aiApi } from '../../../utils/api';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  time: string;
}

Page({
  data: {
    orderId: '',
    travelerId: '',
    messages: [] as Message[],
    inputText: '',
    recording: false,
    showQuickQuestions: true,
    quickQuestions: [
      '现在要去哪儿？',
      '几点集合？',
      '附近有厕所吗？',
      '今天还有什么安排？',
    ],
    recorderManager: null as any,
  },

  onLoad(options: any) {
    const { orderId, travelerName } = options;
    this.setData({
      orderId,
      travelerId: travelerName,
    });

    // 初始化录音管理器
    this.initRecorder();
  },

  /**
   * 初始化录音管理器
   */
  initRecorder() {
    const recorderManager = wx.getRecorderManager();
    
    recorderManager.onStop((res: any) => {
      console.log('录音停止', res);
      // 这里可以将录音转文字，然后发送消息
      this.setData({ recording: false });
      
      // 模拟转文字后发送
      wx.showToast({
        title: '语音识别中...',
        icon: 'loading',
      });
    });

    this.setData({ recorderManager });
  },

  /**
   * 输入框内容变化
   */
  onInput(e: any) {
    this.setData({
      inputText: e.detail.value,
      showQuickQuestions: false,
    });
  },

  /**
   * 快捷问题
   */
  askQuickQuestion(e: any) {
    const text = e.currentTarget.dataset.text;
    this.setData({
      inputText: text,
      showQuickQuestions: false,
    });
    this.sendMessage();
  },

  /**
   * 发送消息
   */
  async sendMessage() {
    const text = this.data.inputText.trim();
    if (!text) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      time: this.formatTime(new Date()),
    };

    this.setData({
      messages: [...this.data.messages, userMessage],
      inputText: '',
    });

    // 请求 AI 回复
    try {
      const res = await aiApi.travelCompanion({
        orderId: this.data.orderId,
        travelerId: this.data.travelerId,
        question: text,
      });

      if (res.data) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: res.data.answerText,
          time: this.formatTime(new Date()),
        };

        this.setData({
          messages: [...this.data.messages, aiMessage],
        });

        // 如果需要语音播报
        if (res.data.shouldSpeak) {
          // 这里可以使用 TTS 播报
          wx.showToast({
            title: '正在播报...',
            icon: 'none',
            duration: 1000,
          });
        }
      }
    } catch (error) {
      wx.showToast({
        title: 'AI 回复失败，请重试',
        icon: 'none',
      });
    }
  },

  /**
   * 开始录音
   */
  startRecord() {
    this.setData({ recording: true });
    
    wx.authorize({
      scope: 'scope.record',
      success: () => {
        this.data.recorderManager.start({
          duration: 60000,
          format: 'mp3',
        });
      },
      fail: () => {
        wx.showToast({
          title: '请授权麦克风权限',
          icon: 'none',
        });
        this.setData({ recording: false });
      },
    });
  },

  /**
   * 停止录音
   */
  stopRecord() {
    if (this.data.recording) {
      this.data.recorderManager.stop();
    }
  },

  /**
   * 取消录音
   */
  cancelRecord() {
    this.setData({ recording: false });
  },

  /**
   * 格式化时间
   */
  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  },
});
