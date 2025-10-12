import { formatInTimeZone } from "date-fns-tz"

export const formatDate = (date: Date, format: string) => {
    return formatInTimeZone(date, 'Asia/Tokyo', format);
}