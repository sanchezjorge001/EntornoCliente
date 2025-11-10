import React, { useReducer, useEffect } from 'react';

const initialState = {
  cookies: 0,
  cursorCount: 0,
  clickMultiplier: 1,
  grandmaCount: 0,
  cursorPrice: 15,
  multiplierPrice: 50,
  grandmaPrice: 100,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'CLICK_COOKIE':
      return {
        ...state,
        cookies: state.cookies + state.clickMultiplier,
      };

    case 'BUY_CURSOR':
      if (state.cookies >= state.cursorPrice) {
        return {
          ...state,
          cookies: state.cookies - state.cursorPrice,
          cursorCount: state.cursorCount + 1,
          cursorPrice: Math.floor(state.cursorPrice * 1.1),
        };
      }
      return state;

    case 'BUY_MULTIPLIER':
      if (state.cookies >= state.multiplierPrice) {
        return {
          ...state,
          cookies: state.cookies - state.multiplierPrice,
          clickMultiplier: state.clickMultiplier + 1,
          multiplierPrice: Math.floor(state.multiplierPrice * 1.2),
        };
      }
      return state;

    case 'BUY_GRANDMA':
      if (state.cookies >= state.grandmaPrice) {
        return {
          ...state,
          cookies: state.cookies - state.grandmaPrice,
          grandmaCount: state.grandmaCount + 1,
          grandmaPrice: Math.floor(state.grandmaPrice * 1.3),
        };
      }
      return state;

    case 'GENERATE_COOKIES':
      const cursorsPerSecond = state.cursorCount * 0.1;
      const grandmasPerSecond = state.grandmaCount * state.clickMultiplier;
      const totalGenerated = cursorsPerSecond + grandmasPerSecond;
      
      return {
        ...state,
        cookies: state.cookies + totalGenerated,
      };

    default:
      return state;
  }
}

export default function CookieClicker() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Aplicar estilos al body
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#111827';
    
    const interval = setInterval(() => {
      dispatch({ type: 'GENERATE_COOKIES' });
    }, 1000);

    return () => {
      clearInterval(interval);
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleClickCookie = () => {
    dispatch({ type: 'CLICK_COOKIE' });
  };

  const handleBuyCursor = () => {
    dispatch({ type: 'BUY_CURSOR' });
  };

  const handleBuyMultiplier = () => {
    dispatch({ type: 'BUY_MULTIPLIER' });
  };

  const handleBuyGrandma = () => {
    dispatch({ type: 'BUY_GRANDMA' });
  };

  const canAfford = (price) => state.cookies >= price;

  const cookiesPerSecond = (state.cursorCount * 0.1) + (state.grandmaCount * state.clickMultiplier);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#111827',
      color: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1f2937',
        borderBottom: '1px solid #374151',
        padding: '20px 24px',
        flexShrink: 0
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: 0
        }}>
          <span style={{fontSize: '40px'}}>🍪</span>
          Cookie Clicker
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Game Panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          padding: '32px',
          overflowY: 'auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px'
            }}>
              {Math.floor(state.cookies)} galletas
            </div>
            <div style={{
              fontSize: '20px',
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span style={{color: '#f97316'}}>⚡</span>
              {cookiesPerSecond.toFixed(1)} por segundo
            </div>
          </div>

          <button 
            style={{
              fontSize: '120px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.1s',
              marginBottom: '24px',
              filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.5))',
              padding: 0
            }}
            onClick={handleClickCookie}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.05)'}
          >
            🍪
          </button>

          <div style={{
            fontSize: '24px',
            color: '#d1d5db'
          }}>
            +{state.clickMultiplier} por clic
          </div>
        </div>

        {/* Shop Panel */}
        <div style={{
          width: '400px',
          minWidth: '400px',
          maxWidth: '400px',
          backgroundColor: '#1f2937',
          borderLeft: '1px solid #374151',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #374151',
            flexShrink: 0
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: 0
            }}>
              <span>🏪</span>
              Tienda
            </h2>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px'
          }}>
            {/* Cursores */}
            <div 
              style={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4b5563'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{fontSize: '24px'}}>👆</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'white',
                  flex: 1
                }}>Cursores</span>
                <span style={{
                  backgroundColor: '#374151',
                  color: '#d1d5db',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>{state.cursorCount}</span>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#9ca3af',
                marginBottom: '12px',
                paddingLeft: '32px'
              }}>
                📊 {(state.cursorCount * 0.1).toFixed(1)} galletas/seg
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '12px',
                paddingLeft: '32px'
              }}>
                {state.cursorPrice} 🍪
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: canAfford(state.cursorPrice) ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s',
                  backgroundColor: canAfford(state.cursorPrice) ? '#059669' : '#374151',
                  color: canAfford(state.cursorPrice) ? 'white' : '#6b7280'
                }}
                onClick={handleBuyCursor}
                disabled={!canAfford(state.cursorPrice)}
                onMouseEnter={(e) => {
                  if (canAfford(state.cursorPrice)) {
                    e.target.style.backgroundColor = '#047857';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canAfford(state.cursorPrice)) {
                    e.target.style.backgroundColor = '#059669';
                  }
                }}
              >
                Comprar Cursor
              </button>
            </div>

            {/* Multiplicador */}
            <div 
              style={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4b5563'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{fontSize: '24px'}}>⚡</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'white',
                  flex: 1
                }}>Multiplicador</span>
                <span style={{
                  backgroundColor: '#374151',
                  color: '#d1d5db',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>Nivel {state.clickMultiplier}</span>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#9ca3af',
                marginBottom: '12px',
                paddingLeft: '32px'
              }}>
                +1 galleta por clic
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '12px',
                paddingLeft: '32px'
              }}>
                {state.multiplierPrice} 🍪
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: canAfford(state.multiplierPrice) ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s',
                  backgroundColor: canAfford(state.multiplierPrice) ? '#059669' : '#374151',
                  color: canAfford(state.multiplierPrice) ? 'white' : '#6b7280'
                }}
                onClick={handleBuyMultiplier}
                disabled={!canAfford(state.multiplierPrice)}
                onMouseEnter={(e) => {
                  if (canAfford(state.multiplierPrice)) {
                    e.target.style.backgroundColor = '#047857';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canAfford(state.multiplierPrice)) {
                    e.target.style.backgroundColor = '#059669';
                  }
                }}
              >
                Comprar Multiplicador
              </button>
            </div>

            {/* Abuelas */}
            <div 
              style={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4b5563'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{fontSize: '24px'}}>👵</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'white',
                  flex: 1
                }}>Abuelas</span>
                <span style={{
                  backgroundColor: '#374151',
                  color: '#d1d5db',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>{state.grandmaCount}</span>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#9ca3af',
                marginBottom: '12px',
                paddingLeft: '32px'
              }}>
                📊 {(state.grandmaCount * state.clickMultiplier).toFixed(1)} galletas/seg
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '12px',
                paddingLeft: '32px'
              }}>
                {state.grandmaPrice} 🍪
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: canAfford(state.grandmaPrice) ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s',
                  backgroundColor: canAfford(state.grandmaPrice) ? '#059669' : '#374151',
                  color: canAfford(state.grandmaPrice) ? 'white' : '#6b7280'
                }}
                onClick={handleBuyGrandma}
                disabled={!canAfford(state.grandmaPrice)}
                onMouseEnter={(e) => {
                  if (canAfford(state.grandmaPrice)) {
                    e.target.style.backgroundColor = '#047857';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canAfford(state.grandmaPrice)) {
                    e.target.style.backgroundColor = '#059669';
                  }
                }}
              >
                Comprar Abuela
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}