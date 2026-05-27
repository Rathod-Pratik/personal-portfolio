'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { GET_NOTES } from '@/utils/constants';
import type { NoteItem } from '@/types';
import Card from './components/Card';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

type GetNotesResponse = {
  data: NoteItem[];
};

export default function Note() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<GetNotesResponse>(GET_NOTES);
        setNotes(response.data.data || []);
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Some error occurred, try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex flex-col py-4">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-3xl font-bold text-center my-6 sm:hidden">
        Notes
      </motion.h2>
      <div className="w-full px-2 sm:px-4">
        {notes.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-12">No notes available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 sm:gap-6 w-full">
            {notes.map((note, index) => (
              <motion.div
                key={note._id || index}
                className="w-full flex justify-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card item={note} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
