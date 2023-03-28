# 1. Importar la tabla de datos desde un archivo CSV o XLSX
import pandas as pd
df = pd.read_csv('C:\\Users\\usuario\\Documents\\PDF Master\\TFM\\INDICADORES\\IMPUESTOS\\TFM_IMPUESTOS.csv', index_col=0)

# 2. Solicitar al usuario que ingrese su patrimonio
patrimonio = int(input("Ingrese su patrimonio: "))

# 3. Identificar en qué tramo se encuentra el patrimonio del usuario
tramos = ['0-167129', '167130-334252', '334253-668499', '668500-1000000', '1000001-2500000', '2500001-5300000', '5300001-10000000', '>10000001']
for i in range(len(tramos)):
    rango = tramos[i].split('-')
    if patrimonio >= int(rango[0]) and patrimonio <= int(rango[1]):
        tramo = tramos[i]
        break

# 4. Encontrar el territorio con el impuesto más bajo para el tramo identificado
territorio = ''
impuesto = float('inf')
for col in df.columns:
    if tramo in col:
        if df.loc['Impuestos', col] < impuesto:
            impuesto = df.loc['Impuestos', col]
            territorio = col.split()[0]

# 5. Retornar el territorio y el impuesto a pagar
print(f"El territorio con el impuesto más bajo para el tramo {tramo} es {territorio} con un impuesto de {impuesto}")
