const FilterDialog = () => {


  return (
    <div className="sticky left-0 right-0 z-20 flex flex-col flex-wrap px-4 py-2 mx-5 rounded-xl bottom-5 bg-slate-100">
      <h2 className="text-lg font-bold">Filter: </h2>
      <section>
        <h3 className="font-semibold">By Types</h3>
      </section>
      <section>
        <h3 className="font-semibold">By Generation</h3>
        <div className="flex space-x-3">
        {
          ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].map(generation => (
            <label key={generation}>
              <input type="checkbox"/>
              <span className="text-sm font-semibold">{generation}</span>
            </label>
          ))
        }
        </div>
      </section>
      <button className="px-5 py-1 text-base text-white bg-green-700 place-self-center rounded-xl">Save Filter</button>
    </div>
  )
}

export default FilterDialog;
