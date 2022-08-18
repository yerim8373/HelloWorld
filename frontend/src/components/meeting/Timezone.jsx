import React, { useMemo, useState } from 'react'
import moment from 'moment-timezone'
import TimezoneSelect, { allTimezones } from 'react-timezone-select'
import Sheet from '../common/Sheet'
import classes from './Timezone.module.css'

export default function Timezone() {
  const [tz, setTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [datetime, setDatetime] = useState(moment())

  useMemo(() => {
    const tzValue = tz.value ?? tz
    setDatetime(datetime.tz(tzValue))
  }, [tz, datetime])

  return (
    <div>
      <Sheet>
        <div className={classes.text}>
          <h1>TIMEZONE</h1>
          <div className={classes.output_wrapper}>
            <div className={classes.text_align}>
              {/* Current Date / Time in{' '} */}
              {/* {tz.value ? tz.value.split('/')[1] : tz.split('/')[1]}:{' '} */}
              <pre>{datetime.format('YY.MM.DD / HH:mm')}</pre>
            </div>
          </div>
          <br />
          <div>
            <TimezoneSelect
              value={tz}
              onChange={setTz}
              timezones={{
                ...allTimezones,
                'America/Lima': 'Pittsburgh',
                'Europe/Berlin': 'Frankfurt',
              }}
            />
          </div>
        </div>
      </Sheet>
    </div>
  )
}
