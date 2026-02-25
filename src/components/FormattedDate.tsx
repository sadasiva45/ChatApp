"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export function FormattedDate({ date, formatStr }: { date: string | Date; formatStr: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span className="invisible">...</span>;
    }

    return <span>{format(new Date(date), formatStr)}</span>;
}
