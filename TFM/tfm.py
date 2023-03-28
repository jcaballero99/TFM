import pandas as pd

# 1. Importar la tabla de datos desde un archivo CSV o XLSX
df = pd.read_csv('tabla_impuestos.csv', index_col=0)

# 2. Definir una función que tome como argumento el patrimonio del usuario
def calcular_impuestos(patrimonio):

    # 3. Identificar en qué tramo se encuentra el patrimonio del usuario
    if patrimonio < 167130:
        tramo = '0-167129'
    elif patrimonio < 334253:
        tramo = '167130-334252'
    elif patrimonio < 668500:
        tramo = '334253-668499'
    elif patrimonio < 1000001:
        tramo = '668500-1000000'
    elif patrimonio < 2500001:
        tramo = '1000001-2500000'
    elif patrimonio < 5300001:
        tramo = '2500001-5300000'
    elif patrimonio < 10000001:
        tramo = '5300001-10000000'
    else:
        tramo = '>10000001'
        
    # 4. Encontrar el territorio con el impuesto más bajo para el tramo identificado
    territorio = df.loc[:, tramo].idxmin()
    
    # 5. Retornar el territorio y el impuesto a pagar
    return territorio, df.loc[territorio, tramo]

# 6. Pedir al usuario que introduzca su patrimonio
patrimonio = int(input("Introduce tu patrimonio: "))

# 7. Llamar a la función y mostrar los resultados
territorio, impuesto = calcular_impuestos(patrimonio)
print("Para un patrimonio de", patrimonio, "euros, el territorio que paga menos impuestos es", territorio, "con un impuesto del", impuesto*100, "%.")
