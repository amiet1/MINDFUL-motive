'use client';
import { useEffect } from 'react';

export default function NotificationHandler() {

  const fetchAndNotify = async () => {

    try {
      console.log('fetching affirmations...')
      const response = await fetch('/api/pages/notify', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '1234',
          categoryId: '5678'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Notification sent successfully', data) 
      } else {
        console.error('Failed to send notification', data)
      }
    } catch (error) {
      console.error('Error fetching and notifying:', error);
    }
  }


  useEffect(() => {
    const times = [9,12,15,18];

      times.forEach(hour => {
        const now = new Date();
        const scheduledTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hour
        );
          if( now > scheduledTime) {
            scheduledTime.setDate(scheduledTime.getDate() - now.getTime());
          }
          const timeUntilNotify = scheduledTime.getTime() - now.getTime();
          setTimeout(fetchAndNotify, timeUntilNotify)
      })
  },[]);
  return (
    <div className='fixed bottom-4 right-4'>
      <button onClick={fetchAndNotify} className='bg-blue-500 text-white p-2 rounded-md'>
        Test Notification
      </button>
    </div>
  );
}


//handles notification browser notifications