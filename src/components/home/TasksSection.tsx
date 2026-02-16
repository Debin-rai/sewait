"use client";

export default function TasksSection() {
    const tasks = [
        {
            icon: "description",
            title: "National ID Renewal",
            titleNp: "राष्ट्रिय परिचयपत्र नवीकरण",
            desc: "Online form and required documents",
        },
        {
            icon: "badge",
            title: "Lost Passport Notice",
            titleNp: "राहदानी हराएको सूचना",
            desc: "Process for new passport",
        },
        {
            icon: "payments",
            title: "Revenue Fee Calculator",
            titleNp: "राजस्व दस्तुर गणना",
            desc: "Fee details for various services",
        },
        {
            icon: "history_edu",
            title: "Costume Permit",
            titleNp: "पोसाक अनुमति पत्र",
            desc: "Formal application and conditions",
        },
    ];

    return (
        <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Special Functions <span className="nepali-font text-sm text-slate-400">विशेष कार्य</span></h2>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Updated</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {tasks.map((task, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                            <span className="material-symbols-outlined">{task.icon}</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                                {task.title}
                            </h4>
                            <p className="text-[10px] text-primary/40 nepali-font">{task.titleNp}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                                {task.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Official Info Banner */}
            <div className="bg-primary p-6 rounded-2xl text-white relative overflow-hidden group mt-4">
                <div className="relative z-10">
                    <h3 className="font-bold text-sm mb-2">Official Information <span className="nepali-font text-white/60">आधिकारिक जानकारी</span></h3>
                    <p className="text-[10px] text-white/80 leading-relaxed">
                        सजिलो साथी is a platform that presents official information from various Nepal Government agencies in a simple manner.
                    </p>
                </div>
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/5 text-7xl rotate-12">verified_user</span>
            </div>
        </div>
    );
}
