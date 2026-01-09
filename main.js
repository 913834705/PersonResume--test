const themeToggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// 初始判断当前主题，默认是日间主题
let isNight = false;


// 切换主题
themeToggleButton.addEventListener("click", function () {
    if (isNight) {
        // 切换到日间
        document.body.classList.remove("night");
        themeIcon.innerHTML = "&#127774;"; // 月亮图标
    } else {
        // 切换到夜间
        document.body.classList.add("night");
        themeIcon.innerHTML = "&#9728;"; // 太阳图标
    }
    isNight = !isNight; // 切换状态
});

// 平滑滚动函数
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 70, // 减去导航栏高度
            behavior: 'smooth'
        });

        // 更新导航项激活状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // 设置当前活动项
        document.querySelector(`.nav-item[data-target="${targetId}"]`).classList.add('active');

    }
}
// 导航项点击事件
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        console.log(targetId);
        smoothScroll(targetId);
    });
});

// 滚动时更新导航项激活状态
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.navTo');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');

            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`.nav-item[data-target="${sectionId}"]`).classList.add('active');

        }
    });
});

// 项目过滤器功能 (ES6模块化模拟)
const ProjectFilter = (() => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // 初始化过滤器
    const init = () => {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 给当前按钮添加active类
                button.classList.add('active');

                // 获取过滤条件
                const filter = button.dataset.filter;

                // 过滤项目
                filterProjects(filter);
            });
        });
    };

    // 过滤项目函数
    const filterProjects = (filter) => {
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.tags.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    return {
        init
    };
})();

 const btn = document.getElementById('btn');
    


    // 等待SDK初始化完成
    document.addEventListener('UniAppJSBridgeReady', function() {
      console.log('UniApp JSBridge 已就绪');
      
      // 1. 监听小程序发来的消息
      uni.webView.onMessage(function(data) {
        console.log('收到小程序消息：', data);
        alert(`小程序消息：${data.content}`);
      });
    });

    // 2. H5主动向小程序发送消息
    btn.onclick = function sendToMiniProgram() {
        console.log('通过onclick绑定的点击事件');
      uni.webView.postMessage({
        data: {
          type: 'fromH5',
          content: '我是H5发来的消息',
          page: location.href
        }
      });
    }





        
// 初始化项目过滤器
document.addEventListener('DOMContentLoaded', () => {
    console.log(12);
    
    ProjectFilter.init();
});
// 下拉菜单功能
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContent = document.getElementById('dropdownContent');
const dropdown = document.querySelector('.dropdown');

// 切换下拉菜单显示状态
dropdownBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('active');
});

// 点击下拉菜单项
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // 更新活动状态
        document.querySelectorAll('.dropdown-link').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');

        // 关闭下拉菜单
        dropdown.classList.remove('active');

    });
});

// 点击页面其他位置关闭下拉菜单
document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// 防止点击下拉菜单内容时关闭菜单
dropdownContent.addEventListener('click', function (e) {
    e.stopPropagation();
});

//异步请求json
// 发起GET请求获取JSON数据
fetch('./data.json') 
    .then(response => {
        if (!response.ok) throw new Error('网络请求错误');
        return response.json(); // 解析JSON数据
    })
    .then(data => {
        console.log('获取的数据:', data); // 处理数据
        // 渲染页面数据
        renderPage(data);
    })
    .catch(error => {
        console.error('请求失败:', error);
    });

//渲染页面数据
function renderPage(data){
      document.getElementById('name').textContent = data.info_name;
      document.getElementById('info_header').textContent = data.info_header;
      document.getElementById('info_introduction').textContent = data.introduction;
      document.getElementById('main_education').textContent = data.main_education;
      document.getElementById('main_school1').textContent = data.main_school1;
      document.getElementById('main_lesson1').textContent = data.main_lesson1;
      document.getElementById('main_school2').textContent = data.main_school2;
      document.getElementById('main_lesson2').textContent = data.main_lesson2;
      document.getElementById('project_name1').textContent = data.project_name1;
      document.getElementById('project_name2').textContent = data.project_name2;
      document.getElementById('project_name3').textContent = data.project_name3;
      document.getElementById('project_introduction1').textContent = data.project_introduction1;
      document.getElementById('project_introduction2').textContent = data.project_introduction2;
      document.getElementById('project_introduction3').textContent = data.project_introduction3;
      document.getElementById('telephone').textContent = data.telephone;
      document.getElementById('email').textContent = data.email;
}