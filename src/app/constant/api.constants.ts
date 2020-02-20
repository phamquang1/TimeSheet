
export const PROJECT_MANAGER = {
    searchProject: '/api/services/app/ProjectService/Filter',
}

export const APP_CONSTANT = {
    EnumProjectStatus: {
        Active: 0,
        Deactive: 1,
        All: 2
    },
    EnumProjectType: {
        Timeandmaterials: 0,
        Fixedfee: 1,
        Nonbillable: 2
    },
    EnumTaskType: {
        Commontask: 0,
        Orthertask: 1
    },
    EnumUserType: {
        Billable: 0,
        ProjectAdmin: 1,
    },
    EnumTypeOfWork: {
        Normalworkinghours: 0,
        Overtime: 1
    },
    TimesheetStatus: {
        All: -1,
        Pending: 1,
        Approve: 2,
        Reject: 3
    },
    EnumDayOfWeek: {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6
    },
    TimesheetViewBy: {
        Project: 0,
        People: 1,
        Week: 2
    },
    TypeViewHomePage: {
        Week: 0,
        Month: 1,
        Quater: 2,
        Year: 3,
        AllTime: 4,
        CustomTime: 5
    },
    MyTimesheetView: {
        Day: 0,
        Week: 1
    },
    MAX_WORKING_TIME : 600,
}