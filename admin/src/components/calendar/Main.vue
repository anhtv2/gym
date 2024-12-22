<template>
  <div class="full-calendar">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default defineComponent({
  components: {
    FullCalendar,
  },
  props: {
    externalEvents: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const calendarOptions = ref({
      locale: "vi",
      buttonText: {
        today: "Hôm nay",
        month: "Tháng",
        week: "Tuần",
        day: "Ngày",
      },
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      initialView: "dayGridMonth",
      events: props.externalEvents,
      editable: true,
      selectable: true,
      dayMaxEvents: true,
      weekends: true,
      eventClick: handleEventClick,
      datesSet: handleDatesSet,
    });

    watch(
      () => props.externalEvents,
      (newEvents) => {
        calendarOptions.value.events = newEvents;
      },
      { immediate: true, deep: true }
    );

    function handleEventClick(clickInfo) {
      if (clickInfo.event.url) {
        window.location.href = clickInfo.event.url;
      }
    }

    function handleDatesSet(dateInfo) {
      emit('fetchBookings', dateInfo.startStr, dateInfo.endStr);
    }

    return {
      calendarOptions,
    };
  },
});
</script>
