function Counters(props) {
  return (
    <div className="flex items-stretch gap-20">
      <div className="bg-[#2c3e50] w-40 text-center    border rounded-lg border-slate-700 h-20 text-xl text-white">
        Total Closed
        <br />
        {props.closed.length}
      </div>
      <div className="bg-[#2c3e50] w-40 text-center    border rounded-lg border-slate-700 h-20 text-xl text-white">
        Total Pending
        <br />
        {props.open.length}
      </div>
      <div className="bg-[#2c3e50] w-40 text-center    border rounded-lg border-slate-700 h-20 text-xl text-white">
        ClosedToday
        <br />
        {props.closedToday.length}
      </div>
      <div className="bg-[#2c3e50] w-40 text-center    border rounded-lg border-slate-700 h-20 text-xl text-white">
        PendingToday
        <br />
        {props.openToday.length}
      </div>
    </div>
  );
}

export default Counters;
