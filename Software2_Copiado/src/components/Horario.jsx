import "../css/styles.css"

export function Horario() {
    // Datos de ejemplo para el horario
  const horario = [
    {
      hora: '8:30 - 9:15',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    },
    {
      hora: '9:25 - 10:10',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    },
    {
        hora: '10:20 - 11:05',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '11:15 - 12:00',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '12:10 - 12:55',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '13:05 - 13:50',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '14:00 - 14:45',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '14:55 - 15:50',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '15:50 - 16:35',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '16:45 - 17:30',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '17:40 - 18:25',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '18:35 - 19:20',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '19:30 - 20:15',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    },
    {
        hora: '20:25 - 21:10',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
    }
  ];

  return (
    <div className="container">
      <h1>Horario de Clases</h1>
      <div >
        <table className="table-fixed table table-bordered">
            <thead className="sticky-top">
            <tr style={{background: 'gray', color:'white'}}>
                <th scope="col" style={{ width: '16%' }}>Hora</th>
                <th scope="col" style={{ width: '14%' }}>Lunes</th>
                <th scope="col" style={{ width: '14%' }}>Martes</th>
                <th scope="col" style={{ width: '14%' }}>Miércoles</th>
                <th scope="col" style={{ width: '14%' }}>Jueves</th>
                <th scope="col" style={{ width: '14%' }}>Viernes</th>
                <th scope="col" style={{ width: '14%' }}>Sabado</th>
            </tr>
            </thead>
            <tbody>
            {horario.map((fila, index) => (
                <tr key={index}>
                <td>{fila.hora}</td>
                <td>{fila.lunes}</td>
                <td>{fila.martes}</td>
                <td>{fila.miercoles}</td>
                <td>{fila.jueves}</td>
                <td>{fila.viernes}</td>
                <td>{fila.sabado}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
  }