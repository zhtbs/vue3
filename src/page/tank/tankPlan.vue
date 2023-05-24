<script setup lang="ts">
  import moment from "moment";
  import { computed, ref, onMounted } from "vue";
  const getDays = (year: string, month: string, block_number: number) => {
    const dayOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
    let days = [];
    let date = moment(`${year}-${month}-01`);
    let num = date.daysInMonth();
    for (let i = 0; i < num; i++) {
      days.push({
        day: date.date(),
        dayOfWeek: dayOfWeek[date.day()],
        block_number
      });
      date.add(1, "day");
      block_number++;
    }
    return days;
  };
  const task = ref();
  const calendar = ref();

  const calendars: any = [];
  const block_size = 30;

  const getCalendar = (start_month: any, end_month: any) => {
    let block_number = 0;
    let days;
    start_month = moment(start_month);
    end_month = moment(end_month);
    let between_month = end_month.diff(start_month, "months");
    for (let i = 0; i <= between_month; i++) {
      days = getDays(start_month.year(), start_month.format("MM"), block_number);
      calendars.push({
        date: start_month.format("YYYY年MM月"),
        year: start_month.year(),
        month: start_month.month(), //month(), 0,1..11と表示
        start_block_number: block_number,
        calendar: days.length,
        days: days
      });
      start_month.add(1, "months");
      block_number = days[days.length - 1].block_number;
      block_number++;
    }
    return block_number;
  };
  let inner_width = 0;
  let inner_height = 0;
  let task_width = 0;
  let task_height = 0;

  const getWindowSize = ():any => {
    inner_width = window.innerWidth;
    inner_height = window.innerHeight;
    task_width = task.value.offsetWidth;
    task_height = task.value.offsetHeight;
    userWidth.value = inner_width - task_width;
    userHeight.value = inner_height - task_height - 95;
    calendar.value.scrollLeft = scrollDistance("2023-01");
  };

  let position_Height=400;
  const windowSizeCheck = (e: WheelEvent):any=> {
  let height =tankslists.value.length;
  if (e.deltaY > 0 && height * 40 > userHeight.value ) {
    position_Height=position_Height+10;
  }
  userHeight.value=position_Height;
  };
  getCalendar("2023-01", "2023-03");
  onMounted(() => {
    //监听浏览器大小变化
    window.addEventListener('resize',getWindowSize());
    //监听浏览器滚动条 
    window.addEventListener('wheel', e=>windowSizeCheck(e));

    window.addEventListener('mousemove',e=> mouseMove(e));
    window.addEventListener('mouseup', e=> stopDrag(e));
  });

  let today = moment();
  //计算开始天到今天有多少天*距离
  const scrollDistance = (start_month: string) => {
    let start_date = moment(start_month);
    let between_days = moment().diff(start_date, "days");
    return (between_days + 1) * block_size - userWidth.value / 2;
  };

  const userWidth = ref<number>(0);
  const userHeight = ref<number>(0);

  const categories = [
    {
      id: 1,
      name: "检测",
      collapsed: false
    },
    {
      id: 2,
      name: "更换备件",
      collapsed: false
    }
  ];



  const taskpara = [
    {
      id: 1,
      category_id: 1,
      name: "备件检测",
      start_date: "2023-02-18",
      end_date: "2023-02-20",
      incharge_user: "一班",
      percentage: 100
    },
    {
      id: 2,
      category_id: 1,
      name: "整体检测",
      start_date: "2023-02-19",
      end_date: "2023-02-23",
      incharge_user: "一班",
      percentage: 90
    },
    {
      id: 3,
      category_id: 1,
      name: "探伤检测",
      start_date: "2023-02-19",
      end_date: "2023-03-04",
      incharge_user: "一班",
      percentage: 40
    },
    {
      id: 6,
      category_id: 2,
      name: "发动机维修",
      start_date: "2023-02-28",
      end_date: "2023-03-08",
      incharge_user: "二班",
      percentage: 0
    },
    {
      id: 7,
      category_id: 2,
      name: "任务1",
      start_date: "2023-02-28",
      end_date: "2023-03-08",
      incharge_user: "二班",
      percentage: 0
    },
    {
      id: 8,
      category_id: 2,
      name: "任务2",
      start_date: "2023-03-08",
      end_date: "2023-03-11",
      incharge_user: "二班",
      percentage: 0
    },
    {
      id: 9,
      category_id: 2,
      name: "任务3",
      start_date: "2023-03-11",
      end_date: "2023-03-15",
      incharge_user: "二班",
      percentage: 0
    },
    {
      id: 10,
      category_id: 2,
      name: "任务4",
      start_date: "2023-03-15",
      end_date: "2023-03-27",
      incharge_user: "二班",
      percentage: 0
    },
    {
      id: 11,
      category_id: 2,
      name: "任务5",
      start_date: "2023-03-15",
      end_date: "2023-03-27",
      incharge_user: "二班",
      percentage: 0
    },
    {
      id: 12,
      category_id: 2,
      name: "任务6",
      start_date: "2023-03-15",
      end_date: "2023-03-27",
      incharge_user: "无班",
      percentage: 0
    },
    {
      id: 13,
      category_id: 2,
      name: "任务7",
      start_date: "2023-03-15",
      end_date: "2023-03-27",
      incharge_user: "二班",
      percentage: 0
    },
    {
      id: 14,
      category_id: 2,
      name: "任务8",
      start_date: "2023-03-27",
      end_date: "2023-03-29",
      incharge_user: "三班",
      percentage: 0
    }
  ];
  const tasks= ref(taskpara)
  //任务数据组合
  const tankslists = computed(() => {
    let lists: any = [];
    categories.map((category) => {
      lists.push({ cat: "项目", ...category });
      tasks.value.map((task) => {
        if (task.category_id === category.id) {
          lists.push({ cat: "任务", ...task });
        }
      });
    });
   //   let display_task_number = Math.floor(userHeight.value / 40);
   // lists.slice(position_id, position_id + display_task_number);
    return lists;
  });
  const OntaskBars=(start_month:string)=> {
  let start_date = moment(start_month);
  let top = 10;
  let left;
  let between;
  let start;
  let style;
  return tankslists.value.map((list:any)=>{
    style = {}
    if(list.cat==='任务'){
      let date_from = moment(list.start_date);
      let date_to = moment(list.end_date);
      between = date_to.diff(date_from, 'days');
      between++;
      start = date_from.diff(start_date, 'days');
      left = start * block_size;
      style = {
        top: `${top}px`,
        left: `${left}px`,
        width: `${block_size * between}px`,
      }
    }
    top = top + 40;
    return {
      style,
      list
    }
  })
  }

  const taskBars = <any>ref([]);
  taskBars.value=OntaskBars("2023-01");

  let dragging:boolean=false
  let pageX:number=0;
  let left :any="";
  let task_id:string=""
  const mouseDownMove=(event:MouseEvent,tank:any)=>{
 
   dragging=true;
   pageX=event.pageX;
   event.target;
   const target = event.target as HTMLElement;
   left = target.style.left;
   task_id=tank.list.id;
  }

  const mouseMove=(event:MouseEvent)=> {
    if (dragging) {
      const target = event.target as HTMLElement;
      const leftnew:string = target.style.left;
      let diff = pageX - event.pageX;
      let px=(parseInt(left.replace('px', ''))-diff);
      if(!isNaN(px)){
        if(px>0){
          target.style.left=`${px}px`;
        }
      }
    }
 }
 const stopDrag=(event:MouseEvent)=>{
    if(dragging){
      let diff = pageX - event.pageX
      let days = Math.ceil(diff /block_size)
      let task:any =tasks.value.find(task=> task.id+''==task_id);
      let start_date = moment(task.start_date).add(-days, 'days')
      let end_date = moment(task.end_date).add(-days, 'days')
      task['start_date'] = start_date.format('YYYY-MM-DD')
      task['end_date'] = end_date.format('YYYY-MM-DD')
      console.log(task)
    }
  taskBars.value=OntaskBars("2023-01");
  dragging=false;
 }

 const mouseDownResize=()=>{
  alert(2);
 }
</script>
<template>
  <div id="gantt-header" class="h-12 p-2 flex items-center">
    <h1 class="text-xl font-bold">甘特图</h1>
  </div>
  <div id="gantt-content" class="flex">
    <div id="gantt-task" ref="task">
      <div id="gantt-task-title" class="flex items-center bg-teal-600 text-white h-20">
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-48 h-full">
          任务
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-24 h-full">
          开始日期
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-24 h-full">
          结束日期
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-16 h-full">
          作者
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-12 h-full">
          进度
        </div>
      </div>

      <div id="gantt-task-list"  class="overflow-y-hidden" :style="`height:${userHeight}px`" >
        <div v-for="(list, index) in tankslists" :key="index" class="flex h-10 border-b">
          <template v-if="list.cat === '项目'">
            <div class="flex items-center font-bold w-full text-sm pl-2">
              {{ list.name }}
            </div>
          </template>
          <template v-else>
            <div class="border-r flex items-center font-bold w-48 text-sm pl-4">
              {{ list.name }}
            </div>
            <div class="border-r flex items-center justify-center w-24 text-sm">
              {{ list.start_date }}
            </div>
            <div class="border-r flex items-center justify-center w-24 text-sm">
              {{ list.end_date }}
            </div>
            <div class="border-r flex items-center justify-center w-16 text-sm">
              {{ list.incharge_user }}
            </div>
            <div class="flex items-center justify-center w-12 text-sm">{{ list.percentage }}%</div>
          </template>
        </div>
      </div>
    </div>
    <div id="gantt-calendar" class="overflow-x-scroll overflow-y-hidden border-l" :style="`width:${userWidth}px`" ref="calendar">
      <div id="gantt-date" class="h-20">
        <div id="gantt-year-month" class="relative h-8">
          <div v-for="(calendar, index) in calendars" :key="index">
            <div
              class="bg-indigo-700 text-white border-b border-r border-t h-8 absolute font-bold text-sm flex items-center justify-center"
              :style="`width:${calendar.calendar * block_size}px;left:${calendar.start_block_number * block_size}px`"
            >
              {{ calendar.date }}
            </div>
          </div>
        </div>
        <div id="gantt-day" class="relative h-12">
          <div v-for="(calendar, index) in calendars" :key="index">
            <div v-for="(day, index) in calendar.days" :key="index">
              <div
                class="border-r border-b h-12 absolute flex items-center justify-center flex-col font-bold text-xs"
                :class="{
                  'bg-blue-100': day.dayOfWeek === '六',
                  'bg-red-100': day.dayOfWeek === '日',
                  'bg-red-600 text-white':
                    calendar.year === today.year() && calendar.month === today.month() && day.day === today.date()
                }"
                :style="`width:${block_size}px;left:${day.block_number * block_size}px`"
              >
                <span>{{ day.day }}</span>
                <span>{{ day.dayOfWeek }}</span>
              </div>
            </div>
          </div>
        </div>

        <div id="gantt-height" class="relative">
          <div v-for="(calendar, index) in calendars" :key="index">
            <div v-for="(day, index) in calendar.days" :key="index">
              <div
                class="border-r border-b absolute"
                :class="{ 'bg-blue-100': day.dayOfWeek === '六', 'bg-red-100': day.dayOfWeek === '日' }"
                :style="`width:${block_size}px;left:${day.block_number * block_size}px;height:${userHeight}px`"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div id="gantt-bar-area" class="relative" :style="`width:${userWidth}px;height:${userHeight}px`">
        <div v-for="(bar,index) in taskBars" :key="index">
        <div :style="bar.style" 
        class="rounded-lg absolute h-5 bg-yellow-300" 
        v-if="bar.list.cat === '任务'"
        @mousedown="mouseDownMove($event,bar)"
        >
          <div class="w-full h-full" style="pointer-events: none;">

            <div class="absolute w-2 h-2 bg-gray-300 border border-black" 
            style="top:6px;left:-6px;cursor:col-resize;pointer-events: initial;" 
            @mousedown.stop="mouseDownResize()">
            </div>
          <div class="absolute w-2 h-2 bg-gray-300 border border-black" style="top:6px;right:-6px;cursor:col-resize">
          </div>            
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<style setup></style>
