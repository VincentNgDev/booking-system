"use client";

import useComponentWillMount from "@/hooks/componentWillMount";
import {
  CalendarEvent,
  ResourceBigCalendar,
  ResourceCalendarProvider,
  useResourceCalendarContext,
} from "@workspace/ui/components/big-calendar/resource-big-calendar";
import { cn } from "@workspace/ui/lib/utils";
import React from "react";
import "@workspace/shared-utils/extension/date-format-ext";

export default function ResourceCalendar() {
  return (
    <ResourceCalendarProvider>
      <ResourceCalendarConfig />
    </ResourceCalendarProvider>
  );
}

function ResourceCalendarConfig() {
  const {
    resources,
    setResources,
    events,
    setEvents,
    addEvent,
    removeEvent,
    updateEvent,
  } = useResourceCalendarContext();

  useComponentWillMount(() => {
    setResources([
      { resourceId: "1", resourceTitle: "Board room" },
      { resourceId: "2", resourceTitle: "Training room" },
      { resourceId: "3", resourceTitle: "Meeting room 1" },
      { resourceId: "4", resourceTitle: "Meeting room 2" },
      { resourceId: "5", resourceTitle: "Ball room" },
      { resourceId: "6", resourceTitle: "Training Gym" },
      { resourceId: "7", resourceTitle: "Meeting room 3" },
      { resourceId: "8", resourceTitle: "Meeting room 4" },
    ]);
    setEvents([
      {
        eventId: "1",
        start: new Date(2025, 3, 24, 10, 0, 0),
        end: new Date(2025, 3, 24, 12, 0, 0),
        eventTitle: "Board meeting",
        resourceId: "1",
      },
      {
        eventId: "2",
        start: new Date(2025, 3, 24, 10, 0, 0),
        end: new Date(2025, 3, 24, 12, 0, 0),
        eventTitle: "Training meeting",
        resourceId: "2",
      },
    ]);
  });

  // InitState for resources
  // React.useEffect(() => {
  //   setResources([
  //     { resourceId: "1", resourceTitle: "Board room" },
  //     { resourceId: "2", resourceTitle: "Training room" },
  //     { resourceId: "3", resourceTitle: "Meeting room 1" },
  //     { resourceId: "4", resourceTitle: "Meeting room 2" },
  //     { resourceId: "5", resourceTitle: "Ball room" },
  //     { resourceId: "6", resourceTitle: "Training Gym" },
  //     { resourceId: "7", resourceTitle: "Meeting room 3" },
  //     { resourceId: "8", resourceTitle: "Meeting room 4" },
  //   ]);

  // }, []);

  const handleSelectSlot = React.useCallback(
    (slotInfo: {
      start: Date;
      end: Date;
      slots: Date[];
      resourceId?: number | string | undefined;
    }) => {
      addEvent({
        eventId: "1123",
        start: slotInfo.start,
        end: slotInfo.end,
        eventTitle: "Board meeting",
        resourceId: slotInfo.resourceId,
      });
    },
    []
  );
  const handleSelectEvent = React.useCallback((event: CalendarEvent) => {
    console.log("Event selected:", event);
  }, []);
  const handleEventDragAndDrop = React.useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }: {
      event: CalendarEvent;
      start: string | Date;
      end: string | Date;
      isAllDay?: boolean;
      resourceId?: string | number;
    }) => {},
    []
  );
  const handleEventResize = React.useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }: {
      event: CalendarEvent;
      start: string | Date;
      end: string | Date;
      isAllDay?: boolean;
      resourceId?: string | number;
    }) => {},
    []
  );
  return (
    <ResourceBigCalendar
      onEventDragAndDrop={handleEventDragAndDrop}
      onEventResize={handleEventResize}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      eventComponent={Event}
    />
  );
}

function Event({ event }: { event: CalendarEvent }) {
  return (
    <div className={cn("bg-teal-600")}>
      <div>
        {event.eventTitle}
      </div>
      <div className="flex text-wrap overflow-hidden">
        {event.start.format("hh:mm a")} - {event.end.format("hh:mm a")}
      </div>
    </div>
  );
}
