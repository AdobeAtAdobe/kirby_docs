# XDM Schema vs Data

<table>
  <tbody>
    <tr>
      <th align="center">XDM Schema (abstract)</th>
      <th align="center">XDM Data (concrete)</th>
    </tr>
    <tr>
      <td valign="top">
          Profile (blueprint)<br/>
          <p style="margin-bottom: 4px; background: #efefef">
              {<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;person : "userEntity",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;eyecolor : "string",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;...<br/>
              }
          </p>
      </td>
      <td valign="top">
          Profile (object)<br/>
          <p style="margin-bottom: 4px; background: #efefef">
              {<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;person : {<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : "John Doe",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;},<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;eyecolor : "blue",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;...<br/>
              }
          </p>
      </td>
    </tr>
  </tbody>

  <table>
    <tbody>
      <tr>
        <th align="center">Customer Schema (abstract)</th>
        <th align="center">Customer Data (concrete)</th>
      </tr>
      <tr>
        <td valign="top">
            Profile (blueprint)<br/>
            <p style="margin-bottom: 4px; background: #efefef">
                {<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;person : "userEntity",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;eyecolor : "string",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;...,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;_customer : {<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;salary : "number"<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                }
            </p>
        </td>
        <td valign="top">
            Profile (object)<br/>
            <p style="margin-bottom: 4px; background: #efefef">
                {<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;person : {<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : "John Doe",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;},<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;eyecolor : "blue",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;...,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;_customer : {<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;salary : 50000.00<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                }
            </p>
        </td>
      </tr>
    </tbody>
