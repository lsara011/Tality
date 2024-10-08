export function MainSection() {
  return (
    <>
      <section className="MainSection">
        <div className="mainSection-title">
          <h1>FIND YOUR NEXT HOSPITALITY OPPORTUNITY WITH TALITY</h1>
        </div>
        <div className="search-form">
          <form>
            <div className="form-group1">
              <input
                type="text"
                id="keywords"
                name="keywords"
                placeholder="Job title, skills, or company"
                required
              />
            </div>

            <div className="form-group2">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="City, state, or zip code"
                required
              />
            </div>

            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
