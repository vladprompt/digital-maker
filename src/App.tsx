/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Code2, Rocket, Palette, Database, Bot, ArrowRight } from 'lucide-react';

export default function App() {
  const suggestions = [
    {
      icon: Bot,
      title: 'ИИ-ассистент или чат-бот',
      desc: 'Чат с Gemini, генерация контента, анализ документов или изображений.',
      badge: 'Gemini AI',
    },
    {
      icon: Database,
      title: 'SaaS & Дашборд',
      desc: 'Аналитика, учет задач, финансы, графики и управление данными.',
      badge: 'Web App',
    },
    {
      icon: Rocket,
      title: 'Интерактивный сервис или инструмент',
      desc: 'Калькуляторы, конвертеры, генераторы, интерактивные карты или редакторы.',
      badge: 'Инструмент',
    },
    {
      icon: Palette,
      title: 'Веб-игра или креативное демо',
      desc: 'Квесты, симуляции, викторины или интерактивные визуализации.',
      badge: 'Интерактив',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-600/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-10 bg-slate-950/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AI Studio Workspace
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Готов к разработке
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-6">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span>Проект успешно инициализирован</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-3xl leading-tight">
          Привет! Что мы <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            создадим сегодня?
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 font-normal leading-relaxed">
          Я готов разработать полноценное веб-приложение: от интерфейса и логики до интеграции с ИИ, базами данных и сервисами. Опишите вашу задумку своими словами!
        </p>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left max-w-3xl">
          {suggestions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-indigo-400 transition-colors">
                  <span>Опишите детали в чате</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        Готов к работе • Напишите задачу или идею в чат, и я начну сборку приложения.
      </footer>
    </div>
  );
}

