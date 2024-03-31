<nav class='navbar navbar-expand-lg navbar-light bg-light'>
  {/* <!-- Container wrapper --> */}
  <div class='container-fluid'>
    {/* <!-- Toggle button --> */}
    <button
      class='navbar-toggler'
      type='button'
      data-mdb-toggle='collapse'
      data-mdb-target='#navbarSupportedContent'
      aria-controls='navbarSupportedContent'
      aria-expanded='false'
      aria-label='Toggle navigation'
    >
      <i class='fas fa-bars'></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div class='collapse navbar-collapse' id='navbarSupportedContent'>
      {/* <!-- Navbar brand --> */}
      <a class='navbar-brand mt-2 mt-lg-0' href='#'>
        <img src='/images/logo.png' height='50' alt='MDB Logo' loading='lazy' />
      </a>
      {/* <!-- Left links --> */}
      <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
        <li class='nav-item'>
          <a class='nav-link' href='http://localhost:3000/home'>
            <FaHome />
          </a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' href='#'>
            <FaComments />
          </a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' href='#'>
            <FaBell />
          </a>
        </li>
      </ul>
      {/* <!-- Left links --> */}
    </div>
    {/* <!-- Collapsible wrapper --> */}

    {/* <!-- Right elements --> */}
    <div class='d-flex align-items-center'>
      {/* <!-- Avatar --> */}
      <div class='dropdown'>
        <a
          class='dropdown-toggle d-flex align-items-center hidden-arrow'
          href='http://localhost:3000/profile'
          id='navbarDropdownMenuAvatar'
          role='button'
          data-mdb-toggle='dropdown'
          aria-expanded='false'
        >
          <img
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            class='rounded-circle'
            height='25'
            alt='Blank Profile Pic'
            loading='lazy'
          />
        </a>
        <ul
          class='dropdown-menu dropdown-menu-end'
          aria-labelledby='navbarDropdownMenuAvatar'
        >
          <li>
            <a class='dropdown-item' href='#'>
              My profile
            </a>
          </li>
          <li>
            <a class='dropdown-item' href='#'>
              Settings
            </a>
          </li>
          <li>
            <a class='dropdown-item' href='#'>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
    {/* <!-- Right elements --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>;
{
  /* <!-- Navbar --> */
}
