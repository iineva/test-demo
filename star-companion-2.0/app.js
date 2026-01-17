/**
 * 星伴 - AI儿童习惯养成助手
 * 交互逻辑脚本
 */

// ==================== 全局状态 ====================
const state = {
  currentScreen: 'splash-screen',
  currentPage: 'home',
  user: {
    nickname: '',
    gender: '',
    age: 0,
    avatar: 'assets/partner_kuqi.png',
    partnerName: '酷奇'
  },
  stats: {
    stars: 128,
    gems: 45,
    streak: 7
  }
};

// 伙伴图片映射
const partnerImages = {
  boy: 'assets/partner_kuqi.png',
  girl: 'assets/partner_mitao.png',
  neutral: 'assets/partner_yuntuan.png'
};

const partnerNames = {
  boy: '酷奇',
  girl: '蜜桃',
  neutral: '云团'
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
  // 模拟启动页
  setTimeout(() => {
    showScreen('onboard-identity');
  }, 2500);
});

// ==================== 屏幕切换 ====================
function showScreen(screenId) {
  // 隐藏所有屏幕
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // 显示目标屏幕
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    state.currentScreen = screenId;
  }

  // 播放切换音效
  playSound('click');
}

// ==================== 引导流程 ====================

// 选择身份
function selectIdentity(type) {
  playSound('click');

  if (type === 'child') {
    showScreen('onboard-name');
  } else {
    // 家长流程 - 暂时也进入孩子流程
    showScreen('onboard-name');
  }
}

// 提交昵称
function submitName() {
  const input = document.getElementById('nickname-input');
  const nickname = input.value.trim();

  if (!nickname) {
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
    return;
  }

  state.user.nickname = nickname;
  playSound('click');
  showScreen('onboard-gender');
}

// 选择性别
function selectGender(gender) {
  playSound('click');

  // 更新选中状态
  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');

  // 设置性别和对应伙伴
  state.user.gender = gender;
  state.user.avatar = partnerImages[gender];
  state.user.partnerName = partnerNames[gender];

  setTimeout(() => {
    showScreen('onboard-age');
  }, 300);
}

// 选择年龄
function selectAge(age) {
  playSound('click');
  state.user.age = age;

  // 更新选中状态
  document.querySelectorAll('.age-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');

  setTimeout(() => {
    showScreen('partner-reveal');
    startPartnerReveal();
  }, 300);
}

// 伙伴揭晓动画
function startPartnerReveal() {
  const eggContainer = document.getElementById('egg-container');
  const partnerContainer = document.getElementById('partner-container');
  const partnerAvatar = document.getElementById('partner-avatar');
  const revealText = document.getElementById('reveal-text');
  const startBtn = document.getElementById('start-journey-btn');

  // 设置伙伴图片
  partnerAvatar.innerHTML = `<img src="${state.user.avatar}" alt="伙伴">`;

  // 开始蛋壳动画
  setTimeout(() => {
    eggContainer.style.display = 'none';
    partnerContainer.classList.remove('hidden');

    // 播放进化音效
    playSound('evolution');

    revealText.innerHTML = `
      <h2>恭喜你！找到了专属伙伴</h2>
      <p style="color: var(--text-secondary); margin-top: 8px;">
        ✨ ${state.user.partnerName} ✨
      </p>
    `;

    setTimeout(() => {
      startBtn.classList.remove('hidden');
    }, 800);
  }, 2000);
}

// 开始旅程
function startJourney() {
  playSound('complete');

  // 更新主应用中的用户信息
  updateUserDisplay();

  // 进入主应用
  showScreen('main-app');
}

// 更新用户显示
function updateUserDisplay() {
  // 更新头部头像为图片
  const headerAvatar = document.getElementById('header-avatar');
  headerAvatar.innerHTML = `<img src="${state.user.avatar}" alt="" style="width:32px;height:32px;border-radius:50%;object-fit:contain;">`;

  document.getElementById('header-name').textContent = state.user.nickname;
  document.getElementById('display-name').textContent = state.user.nickname;

  // 更新个人页头像
  const profileAvatar = document.getElementById('profile-avatar');
  profileAvatar.innerHTML = `<img src="${state.user.avatar}" alt="" style="width:50px;height:50px;border-radius:50%;object-fit:contain;">`;

  document.getElementById('profile-name').textContent = state.user.nickname;

  // 更新主页伙伴图片
  const partnerImg = document.getElementById('partner-img');
  if (partnerImg) {
    partnerImg.src = state.user.avatar;
  }
}

// ==================== 主应用导航 ====================
function switchPage(pageName) {
  playSound('click');

  // 更新导航状态
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  event.currentTarget.classList.add('active');

  // 切换页面
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.classList.add('active');
    state.currentPage = pageName;
  }
}

// ==================== 首页交互 ====================

// 伙伴互动
function interactPartner() {
  const partner = document.getElementById('main-partner');
  const expression = document.getElementById('partner-expression');

  playSound('interact');

  // 添加跳跃动画
  partner.classList.add('bounce-once');

  // 显示表情
  const expressions = ['❤️', '✨', '🎵', '💫', '🌟'];
  expression.textContent = expressions[Math.floor(Math.random() * expressions.length)];
  expression.classList.add('show');

  setTimeout(() => {
    partner.classList.remove('bounce-once');
    expression.classList.remove('show');
  }, 600);

  // 更新对话
  const messages = [
    `嘿嘿，${state.user.nickname}，你今天真棒！`,
    '有什么想完成的目标告诉我吧~',
    '我们一起加油！💪',
    '你是最棒的！✨',
    '今天也要元气满满哦~'
  ];
  document.getElementById('partner-message').textContent =
    messages[Math.floor(Math.random() * messages.length)];
}

// 快捷目标选择
function selectQuickGoal(category) {
  playSound('click');
  const input = document.getElementById('goal-input');

  const suggestions = {
    '学习': '完成今天的作业',
    '运动': '跳绳100个',
    '阅读': '阅读课外书30分钟',
    '家务': '整理自己的房间'
  };

  input.value = suggestions[category] || '';
  input.focus();
}

// 提交目标
function submitGoal() {
  const input = document.getElementById('goal-input');
  const goal = input.value.trim();

  if (!goal) {
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
    return;
  }

  playSound('click');

  // 模拟AI处理
  const message = document.getElementById('partner-message');
  message.innerHTML = `好的！我来帮你规划「${goal}」<br><span style="color: var(--primary);">正在思考中...</span>`;

  setTimeout(() => {
    message.innerHTML = `太棒了！我已经帮你把「${goal}」添加到任务啦！<br>快去任务页面查看吧~ 📋`;
    input.value = '';
    playSound('complete');
  }, 1500);
}

// 语音输入
function startVoice() {
  playSound('click');
  alert('语音输入功能将使用微信原生能力');
}

// ==================== 任务页交互 ====================

// 切换视图
function switchTaskView(view) {
  playSound('click');

  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.currentTarget.classList.add('active');

  if (view === 'calendar') {
    document.getElementById('task-list').classList.add('hidden');
    document.getElementById('calendar-view').classList.remove('hidden');
  } else {
    document.getElementById('task-list').classList.remove('hidden');
    document.getElementById('calendar-view').classList.add('hidden');
  }
}

// 筛选任务
function filterTasks(type) {
  playSound('click');

  document.querySelectorAll('.task-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.currentTarget.classList.add('active');

  // 实际筛选逻辑...
}

// 显示任务详情
function showTaskDetail(taskId) {
  playSound('click');
  // 显示任务详情弹窗...
}

// 完成任务
function completeTask(taskId) {
  playSound('complete');

  // 找到任务卡片
  const taskCard = event.currentTarget.closest('.task-card');
  const taskTitle = taskCard.querySelector('.task-title').textContent;

  // 更新任务状态
  taskCard.classList.add('completing');

  setTimeout(() => {
    taskCard.classList.add('completed');
    taskCard.querySelector('.task-status').innerHTML = '<span class="status-icon">✓</span>';
    taskCard.querySelector('.task-status').classList.remove('pending');
    taskCard.querySelector('.task-status').classList.add('done');
    taskCard.querySelector('.task-action').remove();

    // 显示庆祝弹窗
    showCelebration(taskTitle, 15);

    // 更新星星数
    state.stats.stars += 15;
    document.getElementById('star-count').textContent = state.stats.stars;
  }, 300);
}

// 提交家长任务
function submitParentTask(taskId) {
  playSound('click');

  const btn = event.currentTarget;
  btn.textContent = '待确认';
  btn.classList.add('disabled');
  btn.disabled = true;

  // 提示
  alert('已提交！等待家长确认~');
}

// ==================== 奖励页交互 ====================

// 切换奖励Tab
function switchRewardTab(tab) {
  playSound('click');

  document.querySelectorAll('.reward-tab').forEach(t => {
    t.classList.remove('active');
  });
  event.currentTarget.classList.add('active');

  document.querySelectorAll('.reward-content').forEach(content => {
    content.classList.add('hidden');
  });

  document.getElementById(`${tab}-content`).classList.remove('hidden');
}

// 预览商品
function previewItem(itemId) {
  playSound('click');
  // 显示商品预览...
}

// 显示会员提示
function showVipHint() {
  playSound('click');
  showVipModal();
}

// 显示心愿详情
function showWishDetail(wishId) {
  playSound('click');
  // 显示心愿详情...
}

// ==================== 个人页交互 ====================

function showProfileSwitch() {
  showSwitchModal();
}

function showVipPage() {
  showVipModal();
}

function showDataStats() {
  playSound('click');
  alert('成长数据页面开发中~');
}

function showWardrobe() {
  playSound('click');
  alert('我的仓库页面开发中~');
}

function switchProfile() {
  showSwitchModal();
}

function showSettings() {
  playSound('click');
  alert('设置页面开发中~');
}

// ==================== 弹窗控制 ====================

// 庆祝弹窗
function showCelebration(taskName, reward) {
  document.getElementById('completed-task-name').textContent = taskName;
  document.querySelector('.celebration-reward .reward-earned').textContent = `+${reward}`;
  document.getElementById('celebration-modal').classList.remove('hidden');

  // 重新触发撒花动画
  document.querySelectorAll('.confetti').forEach(c => {
    c.style.animation = 'none';
    c.offsetHeight; // 触发重排
    c.style.animation = null;
  });
}

function closeCelebration() {
  playSound('click');
  document.getElementById('celebration-modal').classList.add('hidden');
}

// VIP弹窗
function showVipModal() {
  playSound('click');
  document.getElementById('vip-modal').classList.remove('hidden');
}

function closeVipModal() {
  document.getElementById('vip-modal').classList.add('hidden');
}

function selectPlan(plan) {
  playSound('click');
  document.querySelectorAll('.plan-card').forEach(card => {
    card.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}

function showParentVerify() {
  playSound('click');
  document.getElementById('vip-modal').classList.add('hidden');
  document.getElementById('verify-modal').classList.remove('hidden');

  // 生成随机数学题
  const a = Math.floor(Math.random() * 50) + 10;
  const b = Math.floor(Math.random() * 30) + 10;
  document.getElementById('verify-question').textContent = `${a} × ${b} = ?`;
  document.getElementById('verify-question').dataset.answer = a * b;
}

function verifyParent() {
  const input = document.getElementById('verify-answer');
  const answer = parseInt(input.value);
  const correct = parseInt(document.getElementById('verify-question').dataset.answer);

  if (answer === correct) {
    playSound('complete');
    document.getElementById('verify-modal').classList.add('hidden');
    alert('验证成功！正在跳转支付...');
    input.value = '';
  } else {
    playSound('error');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
    input.value = '';
    input.placeholder = '答案不对，再试一次';
  }
}

// 角色切换弹窗
function showSwitchModal() {
  playSound('click');
  document.getElementById('switch-modal').classList.remove('hidden');
}

function closeSwitchModal() {
  document.getElementById('switch-modal').classList.add('hidden');
}

function switchToProfile(profileId) {
  playSound('click');
  closeSwitchModal();

  // 切换角色逻辑...
  if (profileId === 'xiaohong') {
    state.user.avatar = '🐰';
    state.user.nickname = '小红';
    updateUserDisplay();
  }
}

// ==================== 家长模式 ====================

function enterParentMode() {
  // 显示数学题验证
  const question = prompt('请计算: 25 × 17 = ?');

  if (parseInt(question) === 425) {
    playSound('complete');
    showScreen('parent-center');
  } else if (question !== null) {
    playSound('error');
    alert('验证失败，请重试');
  }
}

function exitParentMode() {
  playSound('click');
  showScreen('main-app');
}

function showParentReport() {
  playSound('click');
  alert('数据报告页面开发中~');
}

function showParentTasks() {
  playSound('click');
  alert('任务管理页面开发中~');
}

function showParentRewards() {
  playSound('click');
  alert('奖励管理页面开发中~');
}

function showChildManage() {
  playSound('click');
  alert('孩子管理页面开发中~');
}

function showParentSettings() {
  playSound('click');
  alert('系统设置页面开发中~');
}

function createParentTask() {
  playSound('click');
  alert('发布任务功能开发中~');
}

function createReward() {
  playSound('click');
  alert('设置奖励功能开发中~');
}

// ==================== 音效系统 ====================
function playSound(type) {
  // 音效映射（实际项目中会加载真实音频文件）
  const sounds = {
    click: '🔊 click',
    complete: '🎉 complete',
    interact: '💬 interact',
    evolution: '✨ evolution',
    error: '❌ error'
  };

  // 控制台输出模拟音效
  console.log(`[Sound] ${sounds[type] || type}`);

  // 实际项目中会播放音频
  // const audio = document.getElementById(`sound-${type}`);
  // if (audio) { audio.currentTime = 0; audio.play(); }
}

// ==================== 辅助动画类 ====================
const style = document.createElement('style');
style.textContent = `
  .shake {
    animation: shake 0.5s ease-in-out;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }
  
  .bounce-once {
    animation: bounce-once 0.6s ease-out;
  }
  
  @keyframes bounce-once {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }
  
  .partner-expression {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    opacity: 0;
    transition: all 0.3s ease-out;
  }
  
  .partner-expression.show {
    opacity: 1;
    top: -40px;
  }
  
  .completing {
    transform: scale(0.98);
    opacity: 0.7;
  }
  
  .plan-card.selected {
    border-color: var(--primary);
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(244, 114, 182, 0.1));
  }
  
  .task-list.hidden,
  .calendar-view.hidden {
    display: none;
  }
`;
document.head.appendChild(style);
