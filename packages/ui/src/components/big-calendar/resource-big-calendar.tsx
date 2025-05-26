"use client";

import React from "react";
import {
  DateLocalizer,
  momentLocalizer,
  SlotInfo,
  Views,
  Event
} from "react-big-calendar";
import type { EventProps, View } from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import ShadcnBigCalendar from "./shadcn-big-calendar";
import moment from "moment";

const DragAndDropCalendar = withDragAndDrop<CalendarEvent, CalendarResource>(
  ShadcnBigCalendar
);

type ResourceCalendarContextProps = {
  resources: CalendarResource[];
  setResources: (resources: CalendarResource[]) => void;
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (eventId: string) => void;
  updateEvent: (event: CalendarEvent) => void;
};

export const ResourceCalendarContext = React.createContext<
  ResourceCalendarContextProps | undefined
>(undefined);

export const useResourceCalendarContext = () => {
  const context = React.useContext(ResourceCalendarContext);
  if (!context) {
    throw new Error(
      "useResourceCalendarContext must be used within a ResourceCalendarProvider"
    );
  }
  return context;
};

export interface CalendarResource {
  resourceId: string;
  resourceTitle: string;
}

export interface CalendarEvent {
  eventId: string;
  eventTitle: string;
  start: Date;
  end: Date;
  resourceId?: string | number;
  allDay?: boolean;
}

export function ResourceCalendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resources, setCalendarResources] = React.useState<CalendarResource[]>(
    []
  );

  const [events, setCalendarEvents] = React.useState<CalendarEvent[]>([]);

  const setResources = React.useCallback(
    (calendarResources: CalendarResource[]) => {
      setCalendarResources(calendarResources);
    },
    [setCalendarResources]
  );
  const setEvents = React.useCallback(
    (eves: CalendarEvent[]) => {
      setCalendarEvents(eves);
    },
    [setCalendarEvents]
  );

  React.useEffect(() => {
    console.log("Resources updated:", resources);
  }, [resources]);

  React.useEffect(() => {
    console.log("Events updated:", events);
  }, [events]);

  const addEvent = React.useCallback(
    (event: CalendarEvent) => {
      setCalendarEvents((prevEvents) => [...prevEvents, event]);
    },
    [setCalendarEvents]
  );
  const removeEvent = React.useCallback(
    (eventId: string) => {
      setCalendarEvents((prevEvents) =>
        prevEvents.filter((event) => event.eventId !== eventId)
      );
    },
    [setCalendarEvents]
  );
  const updateEvent = React.useCallback(
    (event: CalendarEvent) => {
      setCalendarEvents((prevEvents) =>
        prevEvents.map((prevEvent) =>
          prevEvent.eventId === event.eventId ? event : prevEvent
        )
      );
    },
    [setCalendarEvents]
  );

  const contextValue = React.useMemo(
    () => ({
      resources,
      setResources,
      events,
      setEvents,
      addEvent,
      removeEvent,
      updateEvent,
    }),
    [
      resources,
      setResources,
      events,
      setEvents,
      addEvent,
      removeEvent,
      updateEvent,
    ]
  );

  return (
    <ResourceCalendarContext.Provider value={contextValue}>
      {children}
    </ResourceCalendarContext.Provider>
  );
}

export function ResourceBigCalendar({
  initDate,
  defaultView,
  calendarViews,
  onSelectSlot,
  onSelectEvent,
  onEventDragAndDrop,
  onEventResize,
  eventComponent,
}: {
  initDate?: Date | string | undefined;
  defaultView?: View | undefined;
  calendarViews?: View[] | undefined;
  onSelectSlot: (slotInfo: {
    start: Date;
    end: Date;
    slots: Date[];
    resourceId?: number | string | undefined;
  }) => void;
  onSelectEvent: (event: CalendarEvent) => void;
  onEventDragAndDrop: (args: EventInteractionArgs<CalendarEvent>) => void;
  onEventResize: (args: EventInteractionArgs<CalendarEvent>) => void;
  eventComponent?: React.ComponentType<EventProps<CalendarEvent>> | undefined;
}) {
  const localizer = momentLocalizer(moment);
  const { resources, events } = useResourceCalendarContext();
  const [groupResourcesOnWeek, setGroupResourcesOnWeek] = React.useState(false);
  const { defaultDate, views, components } = React.useMemo(
    () => ({
      defaultDate: initDate ?? moment().toDate(),
      views: calendarViews ?? (["day", "work_week"] as View[]),
      components: {
        event: eventComponent,
      }
    }),
    []
  );
  const handleSelectSlot = React.useCallback(
    (slotInfo: SlotInfo) => {
      onSelectSlot({
        start: slotInfo.start,
        end: slotInfo.end,
        slots: slotInfo.slots,
        resourceId: slotInfo.resourceId,
      });
    },
    [onSelectSlot]
  );
  const handleSelectEvent = React.useCallback(
    (event: CalendarEvent) => {
      onSelectEvent(event);
    },
    [onSelectEvent]
  );
  const moveEvent = React.useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }: EventInteractionArgs<CalendarEvent>) => {
      onEventDragAndDrop({
        event,
        start,
        end,
        resourceId,
        isAllDay: (droppedOnAllDaySlot = false),
      });
    },
    [onEventDragAndDrop]
  );
  const resizeEvent = React.useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }: EventInteractionArgs<CalendarEvent>) => {
      onEventResize({
        event,
        start,
        end,
        resourceId,
        isAllDay: (droppedOnAllDaySlot = false),
      });
    },
    [onEventResize]
  );

  return (
    <div>
      <DragAndDropCalendar
        selectable
        defaultDate={defaultDate}
        defaultView={defaultView ?? Views.DAY}
        events={events}
        localizer={localizer}
        resources={resources}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        step={60}
        views={views}
        resourceGroupingLayout={groupResourcesOnWeek}
        timeslots={1}
        components={components}
      />
    </div>
  );
}
